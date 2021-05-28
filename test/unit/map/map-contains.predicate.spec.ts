import 'jest-extended'

import {mapContains} from '../../../src'

describe('mapContains', () => {
    it.each<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([['a', 1]]), new Set(['a'])],
        [new Map([['c', 1]]), new Set(['a', 'b', 'c'])],
    ])('should be false for %p', (map, values) => {
        expect(mapContains(map, values)).toBeFalse()
    })

    it.each<[Map<unknown, unknown>, Iterable<unknown>]>([
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
    ])('should be true for %p', (map, values) => {
        expect(mapContains(map, values)).toBeTrue()
    })
})
