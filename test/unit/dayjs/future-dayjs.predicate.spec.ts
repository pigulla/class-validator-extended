import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { futureDayjs } from '~'

describe('futureDayjs', () => {
    const now = dayjs('2020-05-01T06:30:00.000Z')
    const notDayjsObjects: [string, unknown][] = [
        ['undefined', undefined],
        ['null', null],
        ['an ISO string', '2020-05-01T06:00:00.000Z'],
        ['a Date object', new Date('2020-05-01T06:00:00.000Z')],
    ]
    const invalidDayjsObjects: [string, unknown][] = [['an invalid Dayjs object', dayjs('2020-05-01T00:99:00.000Z')]]

    beforeAll(() => {
        advanceTo(now.toDate())
    })

    afterAll(() => {
        clear()
    })

    describe('with default options', () => {
        it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', now]])(
            'should be false for %s',
            (_, value) => {
                expect(futureDayjs(value)).toBeFalse()
            }
        )

        it.each<[string, unknown]>([
            ['the next millisecond', now.add(1, 'millisecond')],
            ['the next day', now.add(1, 'day')],
            ['the next year', now.add(1, 'year')],
        ])('should be true for %s', (_, value) => {
            expect(futureDayjs(value)).toBeTrue()
        })

        describe('and allow_invalid set to true', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', now]])(
                'should be false for %s',
                (_, value) => {
                    expect(futureDayjs(value)).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the next millisecond', now.add(1, 'millisecond')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(futureDayjs(value)).toBeTrue()
            })
        })

        describe('and inclusive set to true', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    expect(futureDayjs(value, { inclusive: true })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the current date', now],
                ['the next millisecond', now.add(1, 'millisecond')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(futureDayjs(value, { inclusive: true })).toBeTrue()
            })
        })

        describe('with a granularity of "hour"', () => {
            it.each<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', now],
                ['the next millisecond', now.add(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                expect(futureDayjs(value, { granularity: 'hour' })).toBeFalse()
            })

            it.each<[string, unknown]>([
                ['the next hour', now.add(1, 'hour')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(futureDayjs(value, { granularity: 'hour' })).toBeTrue()
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            it.each<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    expect(futureDayjs(value, { inclusive: true, granularity: 'hour' })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the current date', now],
                ['the next millisecond', now.add(1, 'millisecond')],
                ['the next hour', now.add(1, 'hour')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                expect(futureDayjs(value, { inclusive: true, granularity: 'hour' })).toBeTrue()
            })
        })
    })
})
