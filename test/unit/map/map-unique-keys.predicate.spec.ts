import 'jest-extended'

import { mapUniqueKeys, MapUniqueKeysProjection } from '~'

describe('mapUniqueKeys', () => {
    function selector(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the selector', value => {
        expect(() => mapUniqueKeys(0, value as MapUniqueKeysProjection<unknown, unknown>)).toThrow(TypeError)
    })

    it.each<[Map<unknown, unknown>]>([
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
    ])('should be true for %p', set => {
        expect(mapUniqueKeys(set, selector)).toBeTrue()
    })

    it.each<[unknown]>([
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
    ])('should be false for %p', set => {
        expect(mapUniqueKeys(set, selector)).toBeFalse()
    })
})
