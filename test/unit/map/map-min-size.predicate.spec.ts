import 'jest-extended'

import {mapMinSize} from '../../../src'

describe('mapMinSize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %p as a min',
        min => {
            expect(() => mapMinSize(0, min as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [new Map([]), 0],
        [new Map([[0, 'a']]), 0],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            3,
        ],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
                [4, 'd'],
                [5, 'e'],
            ]),
            3,
        ],
    ])('should be true for %p', (value, min) => {
        expect(mapMinSize(value, min)).toBeTrue()
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
        expect(mapMinSize(value, min)).toBeFalse()
    })
})
