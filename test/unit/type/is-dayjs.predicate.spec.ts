import assert from 'node:assert/strict'
import { describe } from 'node:test'

import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../../../src'
import { itEach } from '../../util'

describe('isDayjs', () => {
    describe('with default options', () => {
        itEach<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %j', (value: unknown) => {
            assert.equal(isDayjs(value), false)
        })

        itEach<[boolean, ConfigType]>([
            [true, '2020-07-20T08:12:58.536Z'],
            [false, '2020-07-20T00:99:00.00Z'],
        ])('should be %j for %j', (expected, value) => {
            const instance = dayjs(value)
            assert.equal(isDayjs(instance), expected)
        })
    })

    describe('with allow_invalid set to true', () => {
        itEach<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %j', (value: unknown) => {
            assert.equal(isDayjs(value, { allow_invalid: false }), false)
        })

        itEach<[boolean, ConfigType]>([
            [true, '2020-07-20T08:12:58.536Z'],
            [true, '2020-07-20T00:99:00.00Z'],
        ])('should be %j true for %j', (expected, value) => {
            const instance = dayjs(value)
            assert.equal(isDayjs(instance, { allow_invalid: true }), expected)
        })
    })

    describe('with allow_invalid set to false', () => {
        itEach<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %j', (value: unknown) => {
            assert.equal(isDayjs(value, { allow_invalid: true }), false)
        })

        itEach<[boolean, ConfigType]>([
            [true, '2020-07-20T08:12:58.536Z'],
            [false, '2020-07-20T00:99:00.00Z'],
        ])('should be %j for %j', (expected, value) => {
            const instance = dayjs(value)
            assert.equal(isDayjs(instance, { allow_invalid: false }), expected)
        })
    })
})
