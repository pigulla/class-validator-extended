import 'jest-extended'

import { mapIncludesKeys } from '~'

describe('mapIncludesKeys', () => {
    it.each<[unknown, Iterable<unknown>]>([
        [undefined, []],
        [null, new Set()],
        [new Map([[1, 'a']]), new Set(['a'])],
        [new Map([[1, 'c']]), new Set(['a', 'b', 'c'])],
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
                [3, 'c'],
            ]),
            new Set([1, 2]),
        ],
    ])('should be false for %p', (map, values) => {
        expect(mapIncludesKeys(map, values)).toBeFalse()
    })

    it.each<[Map<unknown, unknown>, Iterable<unknown>]>([
        [new Map(), []],
        [new Map(), new Set()],
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
                [3, 'c'],
            ]),
            [1, 2, 3],
        ],
    ])('should be true for %p', (map, values) => {
        expect(mapIncludesKeys(map, values)).toBeTrue()
    })
})
