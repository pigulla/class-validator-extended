import 'jest-extended'

import {mapContainsKeys} from '../../../src'

describe('mapContainsKeys', () => {
    it.each<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([[1, 'a']]), new Set(['a'])],
        [new Map([[1, 'c']]), new Set(['a', 'b', 'c'])],
    ])('should be false for %p', (map, values) => {
        expect(mapContainsKeys(map, values)).toBeFalse()
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
    ])('should be true for %p', (map, values) => {
        expect(mapContainsKeys(map, values)).toBeTrue()
    })
})
