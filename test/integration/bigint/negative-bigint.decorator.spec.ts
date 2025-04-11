import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { NegativeBigInt, NEGATIVE_BIGINT } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@NegativeBigInt', () => {
    type Options = Parameters<typeof NegativeBigInt>
    const matrix: Record<string, Options[]> = {
        'property must be a negative BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a negative BigInt': [[{ each: true }]],
    }

    const mockedNegativeBigInt = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/bigint/negative-bigint/negative-bigint.predicate.ts', {
        namedExports: {
            negativeBigInt: mockedNegativeBigInt,
        },
    })
    const { NegativeBigInt: Decorator, NEGATIVE_BIGINT: SYMBOL } =
        require('../../../src/bigint/negative-bigint/negative-bigint.decorator') as {
            NegativeBigInt: typeof NegativeBigInt
            NEGATIVE_BIGINT: typeof NEGATIVE_BIGINT
        }

    afterEach(() => mockedNegativeBigInt.mock.resetCalls())
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
                assert.equal(mockedNegativeBigInt.mock.callCount(), 1)
                assert.deepEqual(mockedNegativeBigInt.mock.calls[0].arguments, [value])
            })
        })
    }
})
