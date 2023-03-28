import 'jest-extended'

import { isNull } from '~'

describe('isNull', () => {
    it.each<[unknown]>([[null]])('should be true for %p', (value: unknown) => {
        expect(isNull(value)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [{}], [[]], [0], [''], [false]])('should be false for %p', (value: unknown) => {
        expect(isNull(value)).toBeFalse()
    })
})
