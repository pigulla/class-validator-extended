import 'jest-extended'

import dayjs = require('dayjs')

import { expectValidationError } from '../../util'

import { SetTestClass } from './set-test-class'

import { SET_UNIQUE } from '~'

describe('SetUnique', () => {
    describe('setUnique', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [new Map()],
            [
                new Set([
                    dayjs('2020-05-01T00:00:00.000Z'),
                    dayjs('2020-05-07T00:00:00.000Z'),
                    dayjs('2020-05-08T00:00:00.000Z'),
                ]),
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new SetTestClass({ setUnique: value }), {
                property: 'setUnique',
                constraint: SET_UNIQUE,
                message: `all setUnique's values must be unique`,
            })
        })
    })

    describe('eachSetUnique', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Map()]],
            [
                [
                    new Set([
                        dayjs('2020-05-07T00:00:00.000Z'),
                        dayjs('2020-05-12T00:00:00.000Z'),
                        dayjs('2020-05-14T00:00:00.000Z'),
                    ]),
                ],
            ],
        ])('should fail validation for %p', value => {
            expectValidationError(new SetTestClass({ eachSetUnique: value }), {
                property: 'eachSetUnique',
                constraint: SET_UNIQUE,
                message: `each value in all eachSetUnique's values must be unique`,
            })
        })
    })
})
