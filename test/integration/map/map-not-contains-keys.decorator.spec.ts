import 'jest-extended'

import { MAP_NOT_CONTAINS_KEYS } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('MapNotContainsKeys', () => {
    describe('mapNotContainsKeys', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()], [new Map([['bam', 1]])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({ mapNotContainsKeys: value }), {
                    property: 'mapNotContainsKeys',
                    constraint: MAP_NOT_CONTAINS_KEYS,
                    message: 'mapNotContainsKeys should not contain $constraint1 keys',
                })
            }
        )
    })

    describe('eachMapNotContainsKeys', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set()]],
            [
                [
                    new Map([['foo', 'bar']]),
                    new Map([
                        [13, 1],
                        [42, 2],
                    ]),
                ],
            ],
            [[new Map([[0, 1]]), new Map()]],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ eachMapNotContainsKeys: value }), {
                property: 'eachMapNotContainsKeys',
                constraint: MAP_NOT_CONTAINS_KEYS,
                message: 'each value in eachMapNotContainsKeys should not contain $constraint1 keys',
            })
        })
    })
})
