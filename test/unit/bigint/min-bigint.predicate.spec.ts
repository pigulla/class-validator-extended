import 'jest-extended'

import { minBigInt } from '~'

describe('minBigInt', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], ['']])(
        'should throw for %p as a minValue',
        minValue => {
            expect(() => minBigInt(0, minValue as number)).toThrow(TypeError)
        }
    )

    it.each<[unknown, number | BigInt]>([
        [BigInt(1), 1],
        [BigInt(1), BigInt(1)],
        [BigInt('-10000'), -100_000],
        [BigInt('-10000'), BigInt('-100000')],
    ])('should be true for %p', (value: unknown, minimum) => {
        expect(minBigInt(value, minimum)).toBeTrue()
    })

    it.each<[unknown, number | BigInt]>([
        [undefined, 0],
        [null, BigInt(0)],
        [BigInt(-1), 0],
        [BigInt(-1), BigInt(0)],
    ])('should be false for %p', (value, minimum) => {
        expect(minBigInt(value, minimum)).toBeFalse()
    })
})
