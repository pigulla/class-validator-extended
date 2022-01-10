import 'jest-extended'

import dayjs = require('dayjs')

import { MAP_UNIQUE } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('MapUnique', () => {
    describe('mapUnique', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [new Set()],
            [
                new Map([
                    [0, 42],
                    [1, 42],
                ]),
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ mapUnique: value }), {
                property: 'mapUnique',
                constraint: MAP_UNIQUE,
                message: `all mapUnique's values must be unique`,
            })
        })
    })

    describe('eachMapUnique', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set()]],
            [
                [
                    new Map([
                        [0, dayjs('2020-05-01T00:00:00.000Z')],
                        [2, dayjs('2020-05-01T00:00:00.000Z')],
                        [4, dayjs('2020-05-08T00:00:00.000Z')],
                    ]),
                ],
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ eachMapUnique: value }), {
                property: 'eachMapUnique',
                constraint: MAP_UNIQUE,
                message: `each value in all eachMapUnique's values must be unique`,
            })
        })
    })
})
