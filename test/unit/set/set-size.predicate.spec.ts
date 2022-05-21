import 'jest-extended'

import { setSize } from '~'

describe('setSize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        `should throw for %p as the 'size' parameter`,
        size => {
            expect(() => setSize(0, size as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [new Set([0]), 1],
        [new Set([1, 2, 3]), 3],
        [new Set([]), 0],
    ])('should be true for %p', (value, size) => {
        expect(setSize(value, size)).toBeTrue()
    })

    it.each<[unknown, number]>([
        [42, 0],
        [new Set([null]), 0],
        [new Set([1, 2, 3]), 2],
    ])('should be false for %p', (value, size) => {
        expect(setSize(value, size)).toBeFalse()
    })
})
