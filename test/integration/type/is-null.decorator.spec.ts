import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import type { IsNull, IS_NULL } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsNull', () => {
    type Options = Parameters<typeof IsNull>

    const matrix: Record<string, Options[]> = {
        'property must be null': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be null': [[{ each: true }]],
    }

    const mockedIsNull = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/type/is-null/is-null.predicate.ts', {
        namedExports: {
            isNull: mockedIsNull,
        },
    })
    const { IsNull: Decorator, IS_NULL: SYMBOL } = require('../../../src/type/is-null/is-null.decorator') as {
        IsNull: typeof IsNull
        IS_NULL: typeof IS_NULL
    }

    afterEach(() => mockedIsNull.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @Decorator(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SYMBOL,
                    message,
                })
                assert.equal(mockedIsNull.mock.callCount(), 1)
                assert.deepEqual(mockedIsNull.mock.calls[0].arguments, [value])
            })
        })
    }
})
