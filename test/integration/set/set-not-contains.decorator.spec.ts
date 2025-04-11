import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { SET_NOT_CONTAINS, SetNotContains } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetNotContains', () => {
    type Options = Parameters<typeof SetNotContains>

    const required = [1, 2, 3]
    const matrix: Record<string, Options[]> = {
        'property must not contain any of the following values: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must not contain any of the following values: 1, 2, 3': [[required, { each: true }]],
    }

    const mockedSetNotContains = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-not-contains/set-not-contains.predicate.ts', {
        namedExports: {
            setNotContains: mockedSetNotContains,
        },
    })
    const { SetNotContains: Decorator, SET_NOT_CONTAINS: SYMBOL } =
        require('../../../src/set/set-not-contains/set-not-contains.decorator') as {
            SetNotContains: typeof SetNotContains
            SET_NOT_CONTAINS: typeof SET_NOT_CONTAINS
        }

    afterEach(() => mockedSetNotContains.mock.resetCalls())
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
                assert.equal(mockedSetNotContains.mock.callCount(), 1)
                assert.deepEqual(mockedSetNotContains.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
