import 'jest-extended'

import { isSet } from '~'

describe('isSet', () => {
    it.each<[unknown]>([[new Set()], [new Set([42, 13])]])('should be true for %p', (value: unknown) => {
        expect(isSet(value)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [{}], [[]], [new Map()], [new WeakSet()]])(
        'should be false for %p',
        (value: unknown) => {
            expect(isSet(value)).toBeFalse()
        }
    )
})
