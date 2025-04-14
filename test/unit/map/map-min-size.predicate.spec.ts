import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapMinSize } from '../../../src'
import { itEach } from '../../util'

describe('mapMinSize', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %s as a min',
        min => {
            assert.throws(() => mapMinSize(0, min as number), TypeError)
        },
    )

    itEach<[unknown, number]>([
        [new Map([]), 0],
        [new Map([[0, 'a']]), 0],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            3,
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
                [4, 'd'],
                [5, 'e'],
            ]),
            3,
        ],
    ])('should be true for %j', (value, min) => {
        assert.equal(mapMinSize(value, min), true)
    })

    itEach<[unknown, number]>([
        [42, 0],
        [new Map([]), 1],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            5,
        ],
    ])('should be false for %j', (value, min) => {
        assert.equal(mapMinSize(value, min), false)
    })
})
