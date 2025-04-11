import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import type { IsSet, IS_SET } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsSet', () => {
    type Options = Parameters<typeof IsSet>

    const matrix: Record<string, Options[]> = {
        'property must be an instance of Set': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an instance of Set': [[{ each: true }]],
    }

    const mockedIsSet = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/type/is-set/is-set.predicate.ts', {
        namedExports: {
            isSet: mockedIsSet,
        },
    })
    const { IsSet: Decorator, IS_SET: SYMBOL } = require('../../../src/type/is-set/is-set.decorator') as {
        IsSet: typeof IsSet
        IS_SET: typeof IS_SET
    }

    afterEach(() => mockedIsSet.mock.resetCalls())
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
                assert.equal(mockedIsSet.mock.callCount(), 1)
                assert.deepEqual(mockedIsSet.mock.calls[0].arguments, [value])
            })
        })
    }
})
