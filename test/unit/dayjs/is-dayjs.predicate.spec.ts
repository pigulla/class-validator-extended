import 'jest-extended'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '~'

describe('isDayjs', () => {
    describe('when is_valid is set', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %p', (value: unknown) => {
            expect(isDayjs(value, { is_valid: true })).toBeFalse()
        })

        it.each<[boolean, Dayjs]>([
            [true, dayjs('2020-07-20T08:12:58.536Z')],
            [false, dayjs('2020-07-20T00:99:00.00Z')],
        ])('should be %p true for %p', (expected, value) => {
            expect(isDayjs(value, { is_valid: true })).toBe(expected)
        })
    })

    describe('when is_valid is not set', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs.duration(42, 'minutes')],
            ['foo'],
        ])('should be false for %p', (value: unknown) => {
            expect(isDayjs(value, { is_valid: false })).toBeFalse()
        })

        it.each<[boolean, Dayjs]>([
            [true, dayjs('2020-07-20T08:12:58.536Z')],
            [true, dayjs('2020-07-20T00:99:00.00Z')],
        ])('should be %p for %p', (expected, value) => {
            expect(isDayjs(value, { is_valid: false })).toBe(expected)
        })
    })
})
