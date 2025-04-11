import assert from 'node:assert/strict'
import { describe, before, after, mock } from 'node:test'

import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'

import { minDayjs } from '../../../src'
import { itEach } from '../../util'

describe('minDayjs', () => {
    const minimum = dayjs('2020-05-01T06:30:00.000Z')
    const notDayjsObjects: [string, unknown][] = [
        ['undefined', undefined],
        ['null', null],
        ['an ISO string', '2020-05-01T06:00:00.000Z'],
        ['a Date object', new Date('2020-05-01T06:00:00.000Z')],
    ]
    const invalidDayjsObjects: [string, unknown][] = [['an invalid Dayjs object', dayjs('2020-05-01T00:99:00.000Z')]]

    before(() => {
        mock.timers.enable({ apis: ['Date'], now: minimum.toDate() })
    })

    after(() => {
        mock.timers.reset()
    })

    itEach<[string, unknown]>([
        ['null', null],
        ['an invalid ISO string', '2020-05-01T00:99:00.000Z'],
    ])('should throw if the "minimum" parameter is %j', (_, value) => {
        assert.throws(() => minDayjs(minimum, value as ConfigType), TypeError)
    })

    describe('with default options', () => {
        itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', minimum]])(
            'should be false for %s',
            (_, value) => {
                assert.equal(minDayjs(value, minimum), false)
            }
        )

        itEach<[string, unknown]>([
            ['the previous millisecond', minimum.add(1, 'millisecond')],
            ['the previous day', minimum.add(1, 'day')],
            ['the previous year', minimum.add(1, 'year')],
        ])('should be true for %s', (_, value) => {
            assert.equal(minDayjs(value, minimum), true)
        })

        describe('and allow_invalid set to true', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', minimum]])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(minDayjs(value, minimum), false)
                }
            )

            itEach<[string, unknown]>([
                ['the previous millisecond', minimum.add(1, 'millisecond')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(minDayjs(value, minimum), true)
            })
        })

        describe('and inclusive set to true', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(minDayjs(value, minimum, { inclusive: true }), false)
                }
            )

            itEach<[string, unknown]>([
                ['the current date', minimum],
                ['the previous millisecond', minimum.add(1, 'millisecond')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(minDayjs(value, minimum, { inclusive: true }), true)
            })
        })

        describe('with a granularity of "hour"', () => {
            itEach<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', minimum],
                ['the previous millisecond', minimum.add(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                assert.equal(minDayjs(value, minimum, { granularity: 'hour' }), false)
            })

            itEach<[string, unknown]>([
                ['the previous hour', minimum.add(1, 'hour')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(minDayjs(value, minimum, { granularity: 'hour' }), true)
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(minDayjs(value, minimum, { inclusive: true, granularity: 'hour' }), false)
                }
            )

            itEach<[string, unknown]>([
                ['the current date', minimum],
                ['the previous millisecond', minimum.add(1, 'millisecond')],
                ['the previous hour', minimum.add(1, 'hour')],
                ['the previous day', minimum.add(1, 'day')],
                ['the previous year', minimum.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(minDayjs(value, minimum, { inclusive: true, granularity: 'hour' }), true)
            })
        })
    })
})
