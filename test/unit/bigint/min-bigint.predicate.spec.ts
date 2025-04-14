import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { minBigInt } from '../../../src'
import { itEach } from '../../util'

describe('minBigInt', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], ['']])(
        'should throw for %s as a minValue',
        minValue => {
            assert.throws(() => minBigInt(0, minValue as number), TypeError)
        },
    )

    itEach<[unknown, number | bigint]>([
        [BigInt(1), 1],
        [BigInt(1), BigInt(1)],
        [BigInt('-10000'), -100_000],
        [BigInt('-10000'), BigInt('-100000')],
    ])('should be true for %s', (value: unknown, minimum) => {
        assert.equal(minBigInt(value, minimum), true)
    })

    itEach<[unknown, number | bigint]>([
        [undefined, 0],
        [null, BigInt(0)],
        [BigInt(-1), 0],
        [BigInt(-1), BigInt(0)],
    ])('should be false for %s', (value, minimum) => {
        assert.equal(minBigInt(value, minimum), false)
    })
})
