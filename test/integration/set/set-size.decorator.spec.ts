import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { SET_SIZE, SetSize } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetSize', () => {
    type Options = Parameters<typeof SetSize>

    const size = 13
    const matrix: Record<string, Options[]> = {
        'property must contain exactly 13 element(s)': [
            [size],
            [size, {}],
            [size, { each: undefined }],
            [size, { each: false }],
        ],
        'each value in property must contain exactly 13 element(s)': [[size, { each: true }]],
    }

    const mockedSetSize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-size/set-size.predicate.ts', {
        namedExports: {
            setSize: mockedSetSize,
        },
    })
    const { SetSize: Decorator, SET_SIZE: SYMBOL } =
        require('../../../src/set/set-size/set-size.decorator') as {
            SetSize: typeof SetSize
            SET_SIZE: typeof SET_SIZE
        }

    afterEach(() => mockedSetSize.mock.resetCalls())
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
                    assert.equal(mockedSetSize.mock.callCount(), 1)
                    assert.deepEqual(mockedSetSize.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
