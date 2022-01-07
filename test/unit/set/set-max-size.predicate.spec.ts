import 'jest-extended'

import { setMaxSize } from '~'

describe('setMaxSize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        'should throw for %p as a max',
        max => {
            expect(() => setMaxSize(0, max as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [new Set([0]), 1],
        [new Set([1, 2, 3]), 5],
        [new Set([]), 0],
        [new Set([]), 1],
    ])('should be true for %p', (value, max) => {
        expect(setMaxSize(value, max)).toBeTrue()
    })

    it.each<[unknown, number]>([
        [42, 0],
        [new Set([null]), 0],
        [new Set([1, 2, 3]), 2],
    ])('should be false for %p', (value, max) => {
        expect(setMaxSize(value, max)).toBeFalse()
    })
})
