import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { SET_CONTAINS, SetContains } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetContains', () => {
    type Options = Parameters<typeof SetContains>

    const required = [1, 2, 3]
    const matrix: Record<string, Options[]> = {
        'property must contain all of the following values: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must contain all of the following values: 1, 2, 3': [
            [required, { each: true }],
        ],
    }

    const mockedSetContains = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-contains/set-contains.predicate.ts', {
        namedExports: {
            setContains: mockedSetContains,
        },
    })
    const { SetContains: Decorator, SET_CONTAINS: SYMBOL } =
        require('../../../src/set/set-contains/set-contains.decorator') as {
            SetContains: typeof SetContains
            SET_CONTAINS: typeof SET_CONTAINS
        }

    afterEach(() => mockedSetContains.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))(
                'when called with options %j',
                options => {
                    class TestClass {
                        @Decorator(...options)
                        property: unknown = value
                    }

                    expectValidationError(new TestClass(), {
                        property: 'property',
                        constraint: SYMBOL,
                        message,
                    })
                    assert.equal(mockedSetContains.mock.callCount(), 1)
                    assert.deepEqual(mockedSetContains.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
