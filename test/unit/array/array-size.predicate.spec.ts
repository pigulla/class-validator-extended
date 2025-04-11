import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { arraySize } from '../../../src'
import { itEach } from '../../util'

describe('arraySize', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        `should throw for %s as the 'size' parameter`,
        size => {
            assert.throws(() => arraySize(0, size as number), TypeError)
        }
    )

    itEach<[unknown, number]>([
        [[0], 1],
        [[1, 2, 3], 3],
        [[], 0],
    ])('should be true for %s', (value, size) => {
        assert.equal(arraySize(value, size), true)
    })

    itEach<[unknown, number]>([
        [42, 0],
        [[null], 0],
        [[1, 2, 3], 2],
    ])('should be false for %s', (value, size) => {
        assert.equal(arraySize(value, size), false)
    })
})
