import 'jest-extended'

import { setUnique } from '~'
import { SetUniqueProjection } from '~/set/set-unique/set-unique.options'

describe('setUnique', () => {
    function selector(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the selector', value => {
        expect(() => setUnique(0, value as SetUniqueProjection<unknown, unknown>)).toThrow(TypeError)
    })

    it.each<[Set<unknown>]>([[new Set()], [new Set([1])], [new Set([1, 2, 3, 4])]])('should be true for %p', set => {
        expect(setUnique(set, selector)).toBeTrue()
    })

    it.each<[unknown]>([[null], [undefined], [new Set([1, 2, 5])]])('should be false for %p', set => {
        expect(setUnique(set, selector)).toBeFalse()
    })
})
