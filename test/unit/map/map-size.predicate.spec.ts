import 'jest-extended'

import { mapSize } from '~'

describe('mapSize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %p as the size parameter',
        min => {
            expect(() => mapSize(0, min as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [new Map([]), 0],
        [new Map([[0, 'a']]), 1],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            3,
        ],
    ])('should be true for %p', (value, min) => {
        expect(mapSize(value, min)).toBeTrue()
    })

    it.each<[unknown, number]>([
        [42, 0],
        [new Map([]), 1],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            5,
        ],
    ])('should be false for %p', (value, min) => {
        expect(mapSize(value, min)).toBeFalse()
    })
})
