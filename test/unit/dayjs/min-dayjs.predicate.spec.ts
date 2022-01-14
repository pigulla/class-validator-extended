import 'jest-extended'

import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { minDayjs } from '~'

describe('minDayjs', () => {
    const minimum = dayjs('2020-05-01T06:30:00.000Z')
    const notDayjsObjects: [string, unknown][] = [
        ['undefined', undefined],
        ['null', null],
        ['an ISO string', '2020-05-01T06:00:00.000Z'],
        ['a Date object', new Date('2020-05-01T06:00:00.000Z')],
    ]
    const invalidDayjsObjects: [string, unknown][] = [['an invalid Dayjs object', dayjs('2020-05-01T00:99:00.000Z')]]

    beforeAll(() => {
        advanceTo(minimum.toDate())
    })

    afterAll(() => {
        clear()
    })

    it.each<[string, unknown]>([
        ['null', null],
        ['an invalid ISO string', '2020-05-01T00:99:00.000Z'],
    ])('should throw if the "minimum" parameter is %p', (_, value) => {
        expect(() => minDayjs(minimum, value as ConfigType)).toThrow(TypeError)
    })

    describe('with default options', () => {
        it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', minimum]])(
            'should be false for %s',
            (_, value) => {
                expect(minDayjs(value, minimum)).toBeFalse()
            }
        )

        it.each<[string, unknown]>([
            ['the previous millisecond', minimum.add(1, 'millisecond')],
            ['the previous day', minimum.add(1, 'day')],
            ['the previous year', minimum.add(1, 'year')],
        ])('should be true for %s', (_, value) => {
            expect(minDayjs(value, minimum)).toBeTrue()
        })

        describe('and allow_invalid set to true', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', minimum]])(
                'should be false for %s',
                (_, value) => {
                    expect(minDayjs(value, minimum)).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the previous millisecond', minimum.add(1, 'millisecond')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(minDayjs(value, minimum)).toBeTrue()
            })
        })

        describe('and inclusive set to true', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    expect(minDayjs(value, minimum, { inclusive: true })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the current date', minimum],
                ['the previous millisecond', minimum.add(1, 'millisecond')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(minDayjs(value, minimum, { inclusive: true })).toBeTrue()
            })
        })

        describe('with a granularity of "hour"', () => {
            it.each<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', minimum],
                ['the previous millisecond', minimum.add(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                expect(minDayjs(value, minimum, { granularity: 'hour' })).toBeFalse()
            })

            it.each<[string, unknown]>([
                ['the previous hour', minimum.add(1, 'hour')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(minDayjs(value, minimum, { granularity: 'hour' })).toBeTrue()
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    expect(minDayjs(value, minimum, { inclusive: true, granularity: 'hour' })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the current date', minimum],
                ['the previous millisecond', minimum.add(1, 'millisecond')],
                ['the previous hour', minimum.add(1, 'hour')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(minDayjs(value, minimum, { inclusive: true, granularity: 'hour' })).toBeTrue()
            })
        })
    })
})
