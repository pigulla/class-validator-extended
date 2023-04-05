import 'jest-extended'

import { notMatches } from '~'

describe('notMatches', () => {
    describe('with two parameters', () => {
        it.each<[string, RegExp]>([
            ['foo', /foo/],
            ['fOO', /foo/i],
        ])('should be false for %p', (value, regex) => {
            expect(notMatches(value, regex)).toBeFalse()
        })

        it.each<[string, RegExp]>([
            ['foo', /bar/],
            ['', /.+/],
        ])('should be true for %p', (value, regex) => {
            expect(notMatches(value, regex)).toBeTrue()
        })

        it.each<[unknown, RegExp]>([
            [undefined, /.*/],
            [null, /.*/],
            [0, /.*/],
            [{}, /.*/],
        ])('should be false for %p', (value, regex) => {
            expect(notMatches(value, regex)).toBeFalse()
        })
    })

    describe('with three parameters', () => {
        it.each<[string, string, string?]>([
            ['foo', 'foo', undefined],
            ['fOO', 'foo', 'i'],
        ])('should be false for %p', (value, pattern, modifiers) => {
            expect(notMatches(value, pattern, modifiers)).toBeFalse()
        })

        it.each<[string, string, string?]>([
            ['foo', 'bar', undefined],
            ['foo', 'bar', 'i'],
        ])('should be true for %p', (value, pattern, modifiers) => {
            expect(notMatches(value, pattern, modifiers)).toBeTrue()
        })

        it.each<[unknown, string, string?]>([
            [undefined, '.*', undefined],
            [null, '.*', undefined],
            [0, '.*', undefined],
            [{}, '.*', 'i'],
        ])('should be false for %p', (value, pattern, modifiers) => {
            expect(notMatches(value, pattern, modifiers)).toBeFalse()
        })
    })
})
