import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { setMinSize } from '../../../src'
import { itEach } from '../../util'

describe('setMinSize', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %s as a min',
        min => {
            assert.throws(() => setMinSize(0, min as number), TypeError)
        },
    )

    itEach<[unknown, number]>([
        [new Set([]), 0],
        [new Set([0]), 0],
        [new Set([1, 2, 3]), 3],
        [new Set([1, 2, 3, 4, 5]), 3],
    ])('should be true for %s', (value, min) => {
        assert.equal(setMinSize(value, min), true)
    })

    itEach<[unknown, number]>([
        [42, 0],
        [new Set([]), 1],
        [new Set([1, 2, 3]), 5],
    ])('should be false for %s', (value, min) => {
        assert.equal(setMinSize(value, min), false)
    })
})
