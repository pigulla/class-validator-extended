import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { IS_BIGINT, IsBigInt } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsBigInt', () => {
    type Options = Parameters<typeof IsBigInt>

    const matrix: Record<string, Options[]> = {
        'property must be a BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a BigInt': [[{ each: true }]],
    }

    const mockedIsBigInt = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/type/is-bigint/is-bigint.predicate.ts', {
        namedExports: {
            isBigInt: mockedIsBigInt,
        },
    })
    const { IsBigInt: Decorator, IS_BIGINT: SYMBOL } =
        require('../../../src/type/is-bigint/is-bigint.decorator') as {
            IsBigInt: typeof IsBigInt
            IS_BIGINT: typeof IS_BIGINT
        }

    afterEach(() => mockedIsBigInt.mock.resetCalls())
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

                    assert.equal(mockedIsBigInt.mock.callCount(), 1)
                    assert.deepEqual(mockedIsBigInt.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
