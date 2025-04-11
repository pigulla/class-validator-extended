import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { setMaxSize } from '../../../src'
import { itEach } from '../../util'

describe('setMaxSize', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %s as a max',
        max => {
            assert.throws(() => setMaxSize(0, max as number), TypeError)
        }
    )

    itEach<[unknown, number]>([
        [new Set([0]), 1],
        [new Set([1, 2, 3]), 5],
        [new Set([]), 0],
        [new Set([]), 1],
    ])('should be true for %j', (value, max) => {
        assert.equal(setMaxSize(value, max), true)
    })

    itEach<[unknown, number]>([
        [42, 0],
        [new Set([null]), 0],
        [new Set([1, 2, 3]), 2],
    ])('should be false for %j', (value, max) => {
        assert.equal(setMaxSize(value, max), false)
    })
})
