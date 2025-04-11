import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapContains } from '../../../src'
import { itEach } from '../../util'

describe('mapContains', () => {
    itEach<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([['a', 1]]), new Set(['a'])],
        [new Map([['c', 1]]), new Set(['a', 'b', 'c'])],
    ])('should be false for %j', (map, values) => {
        assert.equal(mapContains(map, values), false)
    })

    itEach<[Map<unknown, unknown>, Iterable<unknown>]>([
        [new Map(), []],
        [new Map(), new Set()],
        [
            new Map([
                [1, 'a'],
                [2, 'c'],
            ]),
            new Set(),
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
            ]),
            new Set(['a', 'b']),
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'b'],
            ]),
            new Set(['a', 'b']),
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
            ]),
            ['a', 'b'],
        ],
    ])('should be true for %j', (map, values) => {
        assert.equal(mapContains(map, values), true)
    })
})
