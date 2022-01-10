import 'jest-extended'

import { negativeBigInt } from '~'

describe('negativeBigInt', () => {
    it.each<[unknown]>([[BigInt(-1)], [BigInt('-10000')], [BigInt('-100000000000')]])(
        'should be true for %p',
        value => {
            expect(negativeBigInt(value)).toBeTrue()
        }
    )

    it.each<[unknown]>([[undefined], [null], [BigInt(0)], [BigInt(1)]])('should be false for %p', value => {
        expect(negativeBigInt(value)).toBeFalse()
    })
})
