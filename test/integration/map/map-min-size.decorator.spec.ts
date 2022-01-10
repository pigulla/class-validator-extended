import 'jest-extended'

import { MAP_MIN_SIZE } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('MapMinSize', () => {
    describe('mapMinSize', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()], [new Map()], [new Map([[1, null]])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({ mapMinSize: value }), {
                    property: 'mapMinSize',
                    constraint: MAP_MIN_SIZE,
                    message: 'mapMinSize must contain at least $constraint1 elements',
                })
            }
        )
    })

    describe('eachMapMinSize', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set()]],
            [
                [
                    new Map([
                        [1, null],
                        [2, null],
                        [3, null],
                        [4, null],
                    ]),
                    new Map(),
                ],
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ eachMapMinSize: value }), {
                property: 'eachMapMinSize',
                constraint: MAP_MIN_SIZE,
                message: 'each value in eachMapMinSize must contain at least $constraint1 elements',
            })
        })
    })
})
