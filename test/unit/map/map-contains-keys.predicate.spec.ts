import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapContainsKeys } from '../../../src'
import { itEach } from '../../util'

describe('mapContainsKeys', () => {
    itEach<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([[1, 'a']]), new Set(['a'])],
        [new Map([[1, 'c']]), new Set(['a', 'b', 'c'])],
    ])('should be false for %j', (map, values) => {
        assert.equal(mapContainsKeys(map, values), false)
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
            new Set([1, 2]),
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            new Set([1, 2]),
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            [1, 2],
        ],
    ])('should be true for %j', (map, values) => {
        assert.equal(mapContainsKeys(map, values), true)
    })
})
