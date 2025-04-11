import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { SET_MAX_SIZE, SetMaxSize } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetMaxSize', () => {
    type Options = Parameters<typeof SetMaxSize>

    const maximum = 13
    const matrix: Record<string, Options[]> = {
        'property must contain not more than 13 elements': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined }],
            [maximum, { each: false }],
        ],
        'each value in property must contain not more than 13 elements': [[maximum, { each: true }]],
    }

    const mockedSetMaxSize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-max-size/set-max-size.predicate.ts', {
        namedExports: {
            setMaxSize: mockedSetMaxSize,
        },
    })
    const { SetMaxSize: Decorator, SET_MAX_SIZE: SYMBOL } =
        require('../../../src/set/set-max-size/set-max-size.decorator') as {
            SetMaxSize: typeof SetMaxSize
            SET_MAX_SIZE: typeof SET_MAX_SIZE
        }

    afterEach(() => mockedSetMaxSize.mock.resetCalls())
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
                assert.equal(mockedSetMaxSize.mock.callCount(), 1)
                assert.deepEqual(mockedSetMaxSize.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
