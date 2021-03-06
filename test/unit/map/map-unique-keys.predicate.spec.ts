import 'jest-extended'

import { mapUniqueKeys } from '~'

describe('mapUniqueKeys', () => {
    function projection(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the projection', value => {
        expect(() => mapUniqueKeys(0, value as (value: number) => number)).toThrow(TypeError)
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
        expect(mapUniqueKeys(set, projection)).toBeTrue()
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
        expect(mapUniqueKeys(set, projection)).toBeFalse()
    })
})
