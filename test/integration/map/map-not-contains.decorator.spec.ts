import 'jest-extended'

import { MAP_NOT_CONTAINS } from '~'
import { expectValidationError } from '~test/util'

import { MapTestClass } from './map-test-class'

describe('MapNotContains', () => {
    describe('mapNotContains', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()], [new Map([[1, 'baz']])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({ mapNotContains: value }), {
                    property: 'mapNotContains',
                    constraint: MAP_NOT_CONTAINS,
                    message: 'mapNotContains should not contain $constraint1 values',
                })
            }
        )
    })

    describe('eachMapNotContains', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set()]],
            [
                [
                    new Map([['foo', 0]]),
                    new Map([
                        ['bar', 1],
                        ['foo', 2],
                    ]),
                ],
            ],
            [[new Map([[0, 1]]), new Map()]],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ eachMapNotContains: value }), {
                property: 'eachMapNotContains',
                constraint: MAP_NOT_CONTAINS,
                message: 'each value in eachMapNotContains should not contain $constraint1 values',
            })
        })
    })
})
