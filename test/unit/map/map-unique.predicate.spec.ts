import 'jest-extended'

import { mapUnique } from '~'

describe('mapUnique', () => {
    function projection(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the projection', value => {
        expect(() => mapUnique(0, value as (value: number) => number)).toThrow(TypeError)
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
        expect(mapUnique(set, projection)).toBeTrue()
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
        expect(mapUnique(set, projection)).toBeFalse()
    })
})
