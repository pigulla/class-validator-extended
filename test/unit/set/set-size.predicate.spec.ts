import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { setSize } from '../../../src'
import { itEach } from '../../util'

describe('setSize', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        `should throw for %s as the 'size' parameter`,
        size => {
            assert.throws(() => setSize(0, size as number), TypeError)
        }
    )

    itEach<[unknown, number]>([
        [new Set([0]), 1],
        [new Set([1, 2, 3]), 3],
        [new Set([]), 0],
    ])('should be true for %j', (value, size) => {
        assert.equal(setSize(value, size), true)
    })

    itEach<[unknown, number]>([
        [42, 0],
        [new Set([null]), 0],
        [new Set([1, 2, 3]), 2],
    ])('should be false for %j', (value, size) => {
        assert.equal(setSize(value, size), false)
    })
})
