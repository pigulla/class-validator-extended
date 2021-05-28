import 'jest-extended'

import {setNotContains} from '../../../src'

describe('setNotContains', () => {
    let set: Set<unknown>

    beforeEach(() => {
        set = new Set(['foo', 42, null])
    })

    it.each<[Iterable<unknown>]>([[new Set([0])], [[undefined]], [['42']]])('should be true for %p', values => {
        expect(setNotContains(set, values)).toBeTrue()
    })

    it.each<Iterable<unknown>>([[[42]], [new Set([null])], [new Set(['bam', 'baz', 'foo'])]])(
        'should be false for %p',
        value => {
            expect(setNotContains(set, value)).toBeFalse()
        }
    )
})
