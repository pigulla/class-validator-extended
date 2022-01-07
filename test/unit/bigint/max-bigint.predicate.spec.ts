import 'jest-extended'

import { maxBigInt } from '~'

describe('maxBigInt', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], ['']])(
        'should throw for %p as a maxValue',
        maxValue => {
            expect(() => maxBigInt(0, maxValue as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number | BigInt]>([
        [BigInt(1), 1],
        [BigInt(1), BigInt(1)],
        [BigInt('10000'), 100_000],
        [BigInt('10000'), BigInt('100000')],
    ])('should be true for %p', (value: unknown, maximum) => {
        expect(maxBigInt(value, maximum)).toBeTrue()
    })

    it.each<[unknown, number | BigInt]>([
        [undefined, 0],
        [null, BigInt(0)],
        [BigInt(1), 0],
        [BigInt(1), BigInt(0)],
    ])('should be false for %p', (value, maximum) => {
        expect(maxBigInt(value, maximum)).toBeFalse()
    })
})
