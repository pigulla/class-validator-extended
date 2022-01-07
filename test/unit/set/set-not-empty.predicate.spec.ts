import 'jest-extended'

import { setNotEmpty } from '~'

describe('setNotEmpty', () => {
    it.each([[new Set([42])], [new Set(['bar', 'baz'])]])('should be true for %p', value => {
        expect(setNotEmpty(value)).toBeTrue()
    })

    it.each([[undefined], [null], [0], ['0'], [new Date('2020-07-20T08:12:58.536Z')], ['foo'], [new Set()]])(
        'should be false for %p',
        value => {
            expect(setNotEmpty(value)).toBeFalse()
        }
    )
})
