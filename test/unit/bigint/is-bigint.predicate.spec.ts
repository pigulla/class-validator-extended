import 'jest-extended'

import {isBigInt} from '../../../src'

describe('isBigInt', () => {
    it.each<[unknown]>([[BigInt(1)], [BigInt('100000000')]])('should be true for %p', (value: unknown) => {
        expect(isBigInt(value)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [0], ['0'], [Number.POSITIVE_INFINITY], [Number.NaN], ['1000000000000']])(
        'should be false for %p',
        (value: unknown) => {
            expect(isBigInt(value)).toBeFalse()
        }
    )
})
