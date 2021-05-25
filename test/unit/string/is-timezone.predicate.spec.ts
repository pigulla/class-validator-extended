import 'jest-extended'

import {isTimezone} from '../../../src'

describe('isTimezone', () => {
    it.each([['Europe/Berlin'], ['europe/berlin'], ['UTC'], ['utc']])('should be true for %p', value => {
        expect(isTimezone(value)).toBeTrue()
    })

    it.each([[null], [undefined], [''], ['default'], ['Europe']])('should be false for %p', value => {
        expect(isTimezone(value)).toBeFalse()
    })
})
