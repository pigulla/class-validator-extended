import 'jest-extended'

import { MAP_MAX_SIZE } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('MapMaxSize', () => {
    describe('mapMaxSize', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [new Set()],
            [
                new Map([
                    [1, null],
                    [2, null],
                    [3, null],
                    [4, null],
                ]),
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ mapMaxSize: value }), {
                property: 'mapMaxSize',
                constraint: MAP_MAX_SIZE,
                message: 'mapMaxSize must contain not more than $constraint1 elements',
            })
        })
    })

    describe('eachMapMaxSize', () => {
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
            expectValidationError(new MapTestClass({ eachMapMaxSize: value }), {
                property: 'eachMapMaxSize',
                constraint: MAP_MAX_SIZE,
                message: 'each value in eachMapMaxSize must contain not more than $constraint1 elements',
            })
        })
    })
})
