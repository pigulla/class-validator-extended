import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { notMatches } from '../../../src'
import { itEach } from '../../util'

describe('notMatches', () => {
    describe('with two parameters', () => {
        itEach<[string, RegExp]>([
            ['foo', /foo/],
            ['fOO', /foo/i],
        ])('should be false for %j', (value, regex) => {
            assert.equal(notMatches(value, regex), false)
        })

        itEach<[string, RegExp]>([
            ['foo', /bar/],
            ['', /.+/],
        ])('should be true for %j', (value, regex) => {
            assert.equal(notMatches(value, regex), true)
        })

        itEach<[unknown, RegExp]>([
            [undefined, /.*/],
            [null, /.*/],
            [0, /.*/],
            [{}, /.*/],
        ])('should be false for %j', (value, regex) => {
            assert.equal(notMatches(value, regex), false)
        })
    })

    describe('with three parameters', () => {
        itEach<[string, string, string?]>([
            ['foo', 'foo', undefined],
            ['fOO', 'foo', 'i'],
        ])('should be false for %j', (value, pattern, modifiers) => {
            assert.equal(notMatches(value, pattern, modifiers), false)
        })

        itEach<[string, string, string?]>([
            ['foo', 'bar', undefined],
            ['foo', 'bar', 'i'],
        ])('should be true for %j', (value, pattern, modifiers) => {
            assert.equal(notMatches(value, pattern, modifiers), true)
        })

        itEach<[unknown, string, string?]>([
            [undefined, '.*', undefined],
            [null, '.*', undefined],
            [0, '.*', undefined],
            [{}, '.*', 'i'],
        ])('should be false for %j', (value, pattern, modifiers) => {
            assert.equal(notMatches(value, pattern, modifiers), false)
        })
    })
})
