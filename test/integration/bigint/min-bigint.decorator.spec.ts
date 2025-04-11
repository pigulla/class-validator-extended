import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { MinBigInt, MIN_BIGINT } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MinBigInt', () => {
    type Options = Parameters<typeof MinBigInt>

    const min = BigInt(9_000)
    const matrix: Record<string, Options[]> = {
        'property must not be less than 9000': [[min], [min, {}], [min, { each: undefined }], [min, { each: false }]],
        'each value in property must not be less than 9000': [[min, { each: true }]],
    }

    const mockedMinBigInt = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/bigint/min-bigint/min-bigint.predicate.ts', {
        namedExports: {
            minBigInt: mockedMinBigInt,
        },
    })
    const { MinBigInt: Decorator, MIN_BIGINT: SYMBOL } =
        require('../../../src/bigint/min-bigint/min-bigint.decorator') as {
            MinBigInt: typeof MinBigInt
            MIN_BIGINT: typeof MIN_BIGINT
        }

    afterEach(() => mockedMinBigInt.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))('when called with options %o', options => {
                class TestClass {
                    @Decorator(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SYMBOL,
                    message,
                })
                assert.equal(mockedMinBigInt.mock.callCount(), 1)
                assert.deepEqual(mockedMinBigInt.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
