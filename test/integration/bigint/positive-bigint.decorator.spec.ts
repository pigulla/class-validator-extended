import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { POSITIVE_BIGINT, PositiveBigInt } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@PositiveBigInt', () => {
    type Options = Parameters<typeof PositiveBigInt>

    const matrix: Record<string, Options[]> = {
        'property must be a positive BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a positive BigInt': [[{ each: true }]],
    }

    const mockedPositiveBigInt = mock.fn(() => false)
    const mockedModule = mock.module(
        '../../../src/bigint/positive-bigint/positive-bigint.predicate.ts',
        {
            namedExports: {
                positiveBigInt: mockedPositiveBigInt,
            },
        },
    )
    const { PositiveBigInt: Decorator, POSITIVE_BIGINT: SYMBOL } =
        require('../../../src/bigint/positive-bigint/positive-bigint.decorator') as {
            PositiveBigInt: typeof PositiveBigInt
            POSITIVE_BIGINT: typeof POSITIVE_BIGINT
        }

    afterEach(() => mockedPositiveBigInt.mock.resetCalls())
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
                    assert.equal(mockedPositiveBigInt.mock.callCount(), 1)
                    assert.deepEqual(mockedPositiveBigInt.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
