import 'jest-extended'

import {setMinSize} from '../../../src'

describe('setMinSize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %p as a min',
        min => {
            expect(() => setMinSize(0, min as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [new Set([]), 0],
        [new Set([0]), 0],
        [new Set([1, 2, 3]), 3],
        [new Set([1, 2, 3, 4, 5]), 3],
    ])('should be true for %p', (value, min) => {
        expect(setMinSize(value, min)).toBeTrue()
    })

    it.each<[unknown, number]>([
        [42, 0],
        [new Set([]), 1],
        [new Set([1, 2, 3]), 5],
    ])('should be false for %p', (value, min) => {
        expect(setMinSize(value, min)).toBeFalse()
    })
})
