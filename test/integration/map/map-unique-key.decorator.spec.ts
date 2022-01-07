import 'jest-extended'

import dayjs = require('dayjs')

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

import { MAP_UNIQUE_KEY } from '~'

describe('MapUniqueKey', () => {
    describe('mapUniqueKey', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [new Set()],
            [
                new Map([
                    [dayjs('2020-05-01T00:00:00.000Z'), 0],
                    [dayjs('2020-05-02T00:00:00.000Z'), 1],
                    [dayjs('2020-05-08T00:00:00.000Z'), 2],
                ]),
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ mapUniqueKey: value }), {
                property: 'mapUniqueKey',
                constraint: MAP_UNIQUE_KEY,
                message: `all mapUniqueKey's keys must be unique`,
            })
        })
    })

    describe('eachMapUniqueKey', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set()]],
            [
                [
                    new Map(),
                    new Map([
                        [dayjs('2020-05-01T00:00:00.000Z'), 0],
                        [dayjs('2020-05-02T00:00:00.000Z'), 1],
                        [dayjs('2020-05-08T00:00:00.000Z'), 2],
                    ]),
                ],
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ eachMapUniqueKey: value }), {
                property: 'eachMapUniqueKey',
                constraint: MAP_UNIQUE_KEY,
                message: `each value in all eachMapUniqueKey's keys must be unique`,
            })
        })
    })
})
