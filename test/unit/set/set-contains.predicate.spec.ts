import 'jest-extended'

import { setContains } from '~'

describe('setContains', () => {
    let set: Set<unknown>

    beforeEach(() => {
        set = new Set(['foo', 42, null])
    })

    it.each<Iterable<unknown>>([[[42]], [new Set([null])], [new Set(['foo', 42, null])]])(
        'should be true for %p',
        value => {
            expect(setContains(set, value)).toBeTrue()
        }
    )

    it.each<[Iterable<unknown>]>([[new Set([0])], [[undefined]], [['42']], [new Set(['foo', 42, undefined])]])(
        'should be false for %p',
        values => {
            expect(setContains(set, values)).toBeFalse()
        }
    )
})
