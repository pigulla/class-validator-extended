import 'jest-extended'

import {mapMaxSize} from '../../../src'

describe('mapMaxSize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %p as a max',
        max => {
            expect(() => mapMaxSize(0, max as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [new Map([[0, 'a']]), 1],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            5,
        ],
        [new Map([]), 0],
        [new Map([]), 1],
    ])('should be true for %p', (value, max) => {
        expect(mapMaxSize(value, max)).toBeTrue()
    })

    it.each<[unknown, number]>([
        [42, 0],
        [new Map([[null, false]]), 0],
        [
            new Map([
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]),
            2,
        ],
    ])('should be false for %p', (value, max) => {
        expect(mapMaxSize(value, max)).toBeFalse()
    })
})
