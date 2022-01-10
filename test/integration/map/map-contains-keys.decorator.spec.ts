import 'jest-extended'

import { MAP_CONTAINS_KEYS } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('MapContainsKeys', () => {
    describe('mapContainsKeys', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [new Set()],
            [new Map([['foo', 'bar']])],
            [
                new Map([
                    ['bar', 'foo'],
                    ['baz', 'bam'],
                ]),
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ mapContainsKeys: value }), {
                property: 'mapContainsKeys',
                constraint: MAP_CONTAINS_KEYS,
                message: 'mapContainsKeys must contain $constraint1 keys',
            })
        })
    })

    describe('eachMapContainsKeys', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set()]],
            [[new Map([[42, 'bla']]), new Map()]],
            [
                [
                    new Map([
                        ['foo', 1],
                        ['bar', 2],
                    ]),
                    new Map([
                        ['foo', 'foo'],
                        ['xxx', 'bar'],
                    ]),
                ],
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ eachMapContainsKeys: value }), {
                property: 'eachMapContainsKeys',
                constraint: MAP_CONTAINS_KEYS,
                message: 'each value in eachMapContainsKeys must contain $constraint1 keys',
            })
        })
    })
})
