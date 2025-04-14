import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { SET_MIN_SIZE, SetMinSize } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetMinSize', () => {
    type Options = Parameters<typeof SetMinSize>

    const maximum = 13
    const matrix: Record<string, Options[]> = {
        'property must contain at least 13 elements': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined }],
            [maximum, { each: false }],
        ],
        'each value in property must contain at least 13 elements': [[maximum, { each: true }]],
    }

    const mockedSetMinSize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-min-size/set-min-size.predicate.ts', {
        namedExports: {
            setMinSize: mockedSetMinSize,
        },
    })
    const { SetMinSize: Decorator, SET_MIN_SIZE: SYMBOL } =
        require('../../../src/set/set-min-size/set-min-size.decorator') as {
            SetMinSize: typeof SetMinSize
            SET_MIN_SIZE: typeof SET_MIN_SIZE
        }

    afterEach(() => mockedSetMinSize.mock.resetCalls())
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
                    assert.equal(mockedSetMinSize.mock.callCount(), 1)
                    assert.deepEqual(mockedSetMinSize.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
