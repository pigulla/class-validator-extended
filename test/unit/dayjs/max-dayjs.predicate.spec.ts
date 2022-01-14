import 'jest-extended'

import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { maxDayjs } from '~'

describe('maxDayjs', () => {
    const maximum = dayjs('2020-05-01T06:30:00.000Z')
    const notDayjsObjects: [string, unknown][] = [
        ['undefined', undefined],
        ['null', null],
        ['an ISO string', '2020-05-01T06:00:00.000Z'],
        ['a Date object', new Date('2020-05-01T06:00:00.000Z')],
    ]
    const invalidDayjsObjects: [string, unknown][] = [['an invalid Dayjs object', dayjs('2020-05-01T00:99:00.000Z')]]

    beforeAll(() => {
        advanceTo(maximum.toDate())
    })

    afterAll(() => {
        clear()
    })

    it.each<[string, unknown]>([
        ['null', null],
        ['an invalid ISO string', '2020-05-01T00:99:00.000Z'],
    ])('should throw if the "maximum" parameter is %p', (_, value) => {
        expect(() => maxDayjs(maximum, value as ConfigType)).toThrow(TypeError)
    })

    describe('with default options', () => {
        it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', maximum]])(
            'should be false for %s',
            (_, value) => {
                expect(maxDayjs(value, maximum)).toBeFalse()
            }
        )

        it.each<[string, unknown]>([
            ['the next millisecond', maximum.subtract(1, 'millisecond')],
            ['the next day', maximum.subtract(1, 'day')],
            ['the next year', maximum.subtract(1, 'year')],
        ])('should be true for %s', (_, value) => {
            expect(maxDayjs(value, maximum)).toBeTrue()
        })

        describe('and allow_invalid set to true', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', maximum]])(
                'should be false for %s',
                (_, value) => {
                    expect(maxDayjs(value, maximum)).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(maxDayjs(value, maximum)).toBeTrue()
            })
        })

        describe('and inclusive set to true', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    expect(maxDayjs(value, maximum, { inclusive: true })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the current date', maximum],
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(maxDayjs(value, maximum, { inclusive: true })).toBeTrue()
            })
        })

        describe('with a granularity of "hour"', () => {
            it.each<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', maximum],
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                expect(maxDayjs(value, maximum, { granularity: 'hour' })).toBeFalse()
            })

            it.each<[string, unknown]>([
                ['the next hour', maximum.subtract(1, 'hour')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(maxDayjs(value, maximum, { granularity: 'hour' })).toBeTrue()
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    expect(maxDayjs(value, maximum, { inclusive: true, granularity: 'hour' })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the current date', maximum],
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
                ['the next hour', maximum.subtract(1, 'hour')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(maxDayjs(value, maximum, { inclusive: true, granularity: 'hour' })).toBeTrue()
            })
        })
    })
})
