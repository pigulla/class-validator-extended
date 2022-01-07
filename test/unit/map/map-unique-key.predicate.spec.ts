import 'jest-extended'

import { mapUniqueKey } from '~'
import { MapUniqueKeyProjection } from '~/map/map-unique-key/map-unique-key.options'

describe('mapUniqueKey', () => {
    function selector(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the selector', value => {
        expect(() => mapUniqueKey(0, value as MapUniqueKeyProjection<unknown, unknown>)).toThrow(TypeError)
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
        expect(mapUniqueKey(set, selector)).toBeTrue()
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
        expect(mapUniqueKey(set, selector)).toBeFalse()
    })
})
