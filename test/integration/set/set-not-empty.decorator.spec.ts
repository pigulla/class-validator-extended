import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { SET_NOT_EMPTY, SetNotEmpty } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetNotEmpty', () => {
    type Options = Parameters<typeof SetNotEmpty>

    const matrix: Record<string, Options[]> = {
        'property must not be an empty set': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must not be an empty set': [[{ each: true }]],
    }

    const mockedSetNotEmpty = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-not-empty/set-not-empty.predicate.ts', {
        namedExports: {
            setNotEmpty: mockedSetNotEmpty,
        },
    })
    const { SetNotEmpty: Decorator, SET_NOT_EMPTY: SYMBOL } =
        require('../../../src/set/set-not-empty/set-not-empty.decorator') as {
            SetNotEmpty: typeof SetNotEmpty
            SET_NOT_EMPTY: typeof SET_NOT_EMPTY
        }

    afterEach(() => mockedSetNotEmpty.mock.resetCalls())
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
                assert.equal(mockedSetNotEmpty.mock.callCount(), 1)
                assert.deepEqual(mockedSetNotEmpty.mock.calls[0].arguments, [value])
            })
        })
    }
})
