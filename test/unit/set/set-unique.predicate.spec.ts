import 'jest-extended'

import { setUnique } from '~'

describe('setUnique', () => {
    function projection(n: number): number {
        return n % 4
    }

    it.each<[unknown]>([[undefined], [null], ['']])('should throw for %p as the projection', value => {
        expect(() => setUnique(0, value as (value: number) => number)).toThrow(TypeError)
    })

    it.each<[Set<unknown>]>([[new Set()], [new Set([1])], [new Set([1, 2, 3, 4])]])('should be true for %p', set => {
        expect(setUnique(set, projection)).toBeTrue()
    })

    it.each<[unknown]>([[null], [undefined], [new Set([1, 2, 5])]])('should be false for %p', set => {
        expect(setUnique(set, projection)).toBeFalse()
    })
})
