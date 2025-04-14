import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapMaxSize } from '../../../src'
import { itEach } from '../../util'

describe('mapMaxSize', () => {
    itEach<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %s as a max',
        max => {
            assert.throws(() => mapMaxSize(0, max as number), TypeError)
        },
    )

    itEach<[unknown, number]>([
        [new Map([[0, 'a']]), 1],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            5,
        ],
        [new Map([]), 0],
        [new Map([]), 1],
    ])('should be true for %j', (value, max) => {
        assert.equal(mapMaxSize(value, max), true)
    })

    itEach<[unknown, number]>([
        [42, 0],
        [new Map([[null, false]]), 0],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            2,
        ],
    ])('should be false for %j', (value, max) => {
        assert.equal(mapMaxSize(value, max), false)
    })
})
