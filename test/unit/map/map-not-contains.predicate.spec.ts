import 'jest-extended'

import { mapNotContains } from '~'

describe('mapNotContains', () => {
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
            new Set([1, 2]),
        ],
    ])('should be true for %p', (map, values) => {
        expect(mapNotContains(map, values)).toBeTrue()
    })

    it.each<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([[1, 'a']]), new Set(['a'])],
        [new Map([[1, 'c']]), new Set(['a', 'b', 'c'])],
    ])('should be false for %p', (map, values) => {
        expect(mapNotContains(map, values)).toBeFalse()
    })
})
