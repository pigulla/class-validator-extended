import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { ArraySize, ARRAY_SIZE } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@ArraySize', () => {
    type Options = Parameters<typeof ArraySize>

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

    const mockedArraySize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/array/array-size/array-size.predicate.ts', {
        namedExports: {
            arraySize: mockedArraySize,
        },
    })
    const { ArraySize: Decorator, ARRAY_SIZE: SYMBOL } =
        require('../../../src/array/array-size/array-size.decorator') as {
            ArraySize: typeof ArraySize
            ARRAY_SIZE: typeof ARRAY_SIZE
        }

    afterEach(() => mockedArraySize.mock.resetCalls())
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
                assert.equal(mockedArraySize.mock.callCount(), 1)
                assert.deepEqual(mockedArraySize.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
