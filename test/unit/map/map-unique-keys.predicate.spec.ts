import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapUniqueKeys } from '../../../src'
import { itEach } from '../../util'

describe('mapUniqueKeys', () => {
    function projection(n: number): number {
        return n % 4
    }

    itEach<[unknown]>([[undefined], [null], ['']])('should throw for %s as the projection', value => {
        assert.throws(() => mapUniqueKeys(0, value as (value: number) => number), TypeError)
    })

    itEach<[Map<unknown, unknown>]>([
        [new Map()],
        [new Map([['a', 1]])],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
                [4, 'd'],
            ]),
        ],
    ])('should be true for %j', set => {
        assert.equal(mapUniqueKeys(set, projection), true)
    })

    itEach<[unknown]>([
        [null],
        [undefined],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
                [5, 'e'],
            ]),
        ],
    ])('should be false for %j', set => {
        assert.equal(mapUniqueKeys(set, projection), false)
    })
})
