import 'jest-extended'

import dayjs from 'dayjs'

import { MAP_UNIQUE_KEYS } from '~'
import { expectValidationError } from '~test/util'

import { MapTestClass } from './map-test-class'

describe('MapUniqueKeys', () => {
    describe('mapUniqueKeys', () => {
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
            expectValidationError(new MapTestClass({ mapUniqueKeys: value }), {
                property: 'mapUniqueKeys',
                constraint: MAP_UNIQUE_KEYS,
                message: `all mapUniqueKeys's keys must be unique`,
            })
        })
    })

    describe('eachMapUniqueKeys', () => {
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
            expectValidationError(new MapTestClass({ eachMapUniqueKeys: value }), {
                property: 'eachMapUniqueKeys',
                constraint: MAP_UNIQUE_KEYS,
                message: `each value in all eachMapUniqueKeys's keys must be unique`,
            })
        })
    })
})
