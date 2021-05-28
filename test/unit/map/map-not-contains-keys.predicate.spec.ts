import 'jest-extended'

import {mapNotContainsKeys} from '../../../src'

describe('mapNotContainsKeys', () => {
    it.each<[Map<unknown, unknown>, Iterable<unknown>]>([
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
    ])('should be true for %p', (map, values) => {
        expect(mapNotContainsKeys(map, values)).toBeTrue()
    })

    it.each<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([['a', 1]]), new Set(['a'])],
        [new Map([['c', 1]]), new Set(['a', 'b', 'c'])],
    ])('should be false for %p', (map, values) => {
        expect(mapNotContainsKeys(map, values)).toBeFalse()
    })
})
