import 'jest-extended'
import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '~'

describe('isDayjs', () => {
    describe('with default options', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %p', (value: unknown) => {
            expect(isDayjs(value)).toBeFalse()
        })

        it.each<[boolean, ConfigType]>([
            [true, '2020-07-20T08:12:58.536Z'],
            [false, '2020-07-20T00:99:00.00Z'],
        ])('should be %p for %p', (expected, value) => {
            const instance = dayjs(value)
            expect(isDayjs(instance)).toBe(expected)
        })
    })

    describe('with allow_invalid set to true', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %p', (value: unknown) => {
            expect(isDayjs(value, { allow_invalid: false })).toBeFalse()
        })

        it.each<[boolean, ConfigType]>([
            [true, '2020-07-20T08:12:58.536Z'],
            [true, '2020-07-20T00:99:00.00Z'],
        ])('should be %p true for %p', (expected, value) => {
            const instance = dayjs(value)
            expect(isDayjs(instance, { allow_invalid: true })).toBe(expected)
        })
    })

    describe('with allow_invalid set to false', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %p', (value: unknown) => {
            expect(isDayjs(value, { allow_invalid: true })).toBeFalse()
        })

        it.each<[boolean, ConfigType]>([
            [true, '2020-07-20T08:12:58.536Z'],
            [false, '2020-07-20T00:99:00.00Z'],
        ])('should be %p for %p', (expected, value) => {
            const instance = dayjs(value)
            expect(isDayjs(instance, { allow_invalid: false })).toBe(expected)
        })
    })
})
