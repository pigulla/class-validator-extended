import 'jest-extended'

import { arraySize } from '~'

describe('arraySize', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], [''], [BigInt(4)]])(
        `should throw for %p as the 'size' parameter`,
        size => {
            expect(() => arraySize(0, size as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number]>([
        [[0], 1],
        [[1, 2, 3], 3],
        [[], 0],
    ])('should be true for %p', (value, size) => {
        expect(arraySize(value, size)).toBeTrue()
    })

    it.each<[unknown, number]>([
        [42, 0],
        [[null], 0],
        [[1, 2, 3], 2],
    ])('should be false for %p', (value, size) => {
        expect(arraySize(value, size)).toBeFalse()
    })
})
