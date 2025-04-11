import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapNotContains } from '../../../src'
import { itEach } from '../../util'

describe('mapNotContains', () => {
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
            new Set([1, 2]),
        ],
    ])('should be true for %j', (map, values) => {
        assert.equal(mapNotContains(map, values), true)
    })

    itEach<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([[1, 'a']]), new Set(['a'])],
        [new Map([[1, 'c']]), new Set(['a', 'b', 'c'])],
    ])('should be false for %j', (map, values) => {
        assert.equal(mapNotContains(map, values), false)
    })
})
