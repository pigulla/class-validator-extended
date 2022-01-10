import 'jest-extended'

import { mapUnique, MapUniqueProjection } from '~'

describe('mapUnique', () => {
    function selector(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the selector', value => {
        expect(() => mapUnique(0, value as MapUniqueProjection<unknown, unknown>)).toThrow(TypeError)
    })

    it.each<[Map<unknown, unknown>]>([
        [new Map()],
        [new Map([['a', 1]])],
        [
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
                ['d', 4],
            ]),
        ],
    ])('should be true for %p', set => {
        expect(mapUnique(set, selector)).toBeTrue()
    })

    it.each<[unknown]>([
        [null],
        [undefined],
        [
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
                ['e', 5],
            ]),
        ],
    ])('should be false for %p', set => {
        expect(mapUnique(set, selector)).toBeFalse()
    })
})
