import assert from 'node:assert/strict'
import { after, before, describe, mock } from 'node:test'

import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'

import { maxDayjs } from '../../../src'
import { itEach } from '../../util'

describe('maxDayjs', () => {
    const maximum = dayjs('2020-05-01T06:30:00.000Z')
    const notDayjsObjects: [string, unknown][] = [
        ['undefined', undefined],
        ['null', null],
        ['an ISO string', '2020-05-01T06:00:00.000Z'],
        ['a Date object', new Date('2020-05-01T06:00:00.000Z')],
    ]
    const invalidDayjsObjects: [string, unknown][] = [
        ['an invalid Dayjs object', dayjs('2020-05-01T00:99:00.000Z')],
    ]

    before(() => {
        mock.timers.enable({ apis: ['Date'], now: maximum.toDate() })
    })

    after(() => {
        mock.timers.reset()
    })

    itEach<[string, unknown]>([
        ['null', null],
        ['an invalid ISO string', '2020-05-01T00:99:00.000Z'],
    ])('should throw if the "maximum" parameter is %j', (_, value) => {
        assert.throws(() => maxDayjs(maximum, value as ConfigType), TypeError)
    })

    describe('with default options', () => {
        itEach<[string, unknown]>([
            ...notDayjsObjects,
            ...invalidDayjsObjects,
            ['the current date', maximum],
        ])('should be false for %s', (_, value) => {
            assert.equal(maxDayjs(value, maximum), false)
        })

        itEach<[string, unknown]>([
            ['the next millisecond', maximum.subtract(1, 'millisecond')],
            ['the next day', maximum.subtract(1, 'day')],
            ['the next year', maximum.subtract(1, 'year')],
        ])('should be true for %s', (_, value) => {
            assert.equal(maxDayjs(value, maximum), true)
        })

        describe('and allow_invalid set to true', () => {
            itEach<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', maximum],
            ])('should be false for %s', (_, value) => {
                assert.equal(maxDayjs(value, maximum), false)
            })

            itEach<[string, unknown]>([
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(maxDayjs(value, maximum), true)
            })
        })

        describe('and inclusive set to true', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(maxDayjs(value, maximum, { inclusive: true }), false)
                },
            )

            itEach<[string, unknown]>([
                ['the current date', maximum],
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(maxDayjs(value, maximum, { inclusive: true }), true)
            })
        })

        describe('with a granularity of "hour"', () => {
            itEach<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', maximum],
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                assert.equal(maxDayjs(value, maximum, { granularity: 'hour' }), false)
            })

            itEach<[string, unknown]>([
                ['the next hour', maximum.subtract(1, 'hour')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(maxDayjs(value, maximum, { granularity: 'hour' }), true)
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(
                        maxDayjs(value, maximum, { inclusive: true, granularity: 'hour' }),
                        false,
                    )
                },
            )

            itEach<[string, unknown]>([
                ['the current date', maximum],
                ['the next millisecond', maximum.subtract(1, 'millisecond')],
                ['the next hour', maximum.subtract(1, 'hour')],
                ['the next day', maximum.subtract(1, 'day')],
                ['the next year', maximum.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(
                    maxDayjs(value, maximum, { inclusive: true, granularity: 'hour' }),
                    true,
                )
            })
        })
    })
})
