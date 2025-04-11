import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapNotContainsKeys } from '../../../src'
import { itEach } from '../../util'

describe('mapNotContainsKeys', () => {
    itEach<[Map<unknown, unknown>, Iterable<unknown>]>([
        [new Map(), []],
        [new Map(), ['1', 42, null, undefined]],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
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
    ])('should be true for %j', (map, values) => {
        assert.equal(mapNotContainsKeys(map, values), true)
    })

    itEach<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([['a', 1]]), new Set(['a'])],
        [new Map([['c', 1]]), new Set(['a', 'b', 'c'])],
    ])('should be false for %j', (map, values) => {
        assert.equal(mapNotContainsKeys(map, values), false)
    })
})
