import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { MAX_BIGINT, MaxBigInt } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MaxBigInt', () => {
    type Options = Parameters<typeof MaxBigInt>

    const max = BigInt(9_000)
    const matrix: Record<string, Options[]> = {
        'property must not be larger than 9000': [
            [max],
            [max, {}],
            [max, { each: undefined }],
            [max, { each: false }],
        ],
        'each value in property must not be larger than 9000': [[max, { each: true }]],
    }

    const mockedMaxBigInt = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/bigint/max-bigint/max-bigint.predicate.ts', {
        namedExports: {
            maxBigInt: mockedMaxBigInt,
        },
    })
    const { MaxBigInt: Decorator, MAX_BIGINT: SYMBOL } =
        require('../../../src/bigint/max-bigint/max-bigint.decorator') as {
            MaxBigInt: typeof MaxBigInt
            MAX_BIGINT: typeof MAX_BIGINT
        }

    afterEach(() => mockedMaxBigInt.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))(
                'when called with options %o',
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
                    assert.equal(mockedMaxBigInt.mock.callCount(), 1)
                    assert.deepEqual(mockedMaxBigInt.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
