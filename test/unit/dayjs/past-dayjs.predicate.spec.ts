import assert from 'node:assert/strict'
import { after, before, describe, mock } from 'node:test'

import dayjs from 'dayjs'

import { pastDayjs } from '../../../src'
import { itEach } from '../../util'

describe('pastDayjs', () => {
    const now = dayjs('2020-05-01T06:30:00.000Z')
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
        mock.timers.enable({ apis: ['Date'], now: now.toDate() })
    })

    after(() => {
        mock.timers.reset()
    })

    describe('with default options', () => {
        itEach<[string, unknown]>([
            ...notDayjsObjects,
            ...invalidDayjsObjects,
            ['the current date', now],
        ])('should be false for %s', (_, value) => {
            assert.equal(pastDayjs(value), false)
        })

        itEach<[string, unknown]>([
            ['the previous millisecond', now.subtract(1, 'millisecond')],
            ['the previous day', now.subtract(1, 'day')],
            ['the previous year', now.subtract(1, 'year')],
        ])('should be true for %s', (_, value) => {
            assert.equal(pastDayjs(value), true)
        })

        describe('and allow_invalid set to true', () => {
            itEach<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', now],
            ])('should be false for %s', (_, value) => {
                assert.equal(pastDayjs(value), false)
            })

            itEach<[string, unknown]>([
                ['the previous millisecond', now.subtract(1, 'millisecond')],
                ['the previous day', now.subtract(1, 'day')],
                ['the previous year', now.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(pastDayjs(value), true)
            })
        })

        describe('and inclusive set to true', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(pastDayjs(value, { inclusive: true }), false)
                },
            )

            itEach<[string, unknown]>([
                ['the current date', now],
                ['the previous millisecond', now.subtract(1, 'millisecond')],
                ['the previous day', now.subtract(1, 'day')],
                ['the previous year', now.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(pastDayjs(value, { inclusive: true }), true)
            })
        })

        describe('with a granularity of "hour"', () => {
            itEach<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', now],
                ['the previous millisecond', now.subtract(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                assert.equal(pastDayjs(value, { granularity: 'hour' }), false)
            })

            itEach<[string, unknown]>([
                ['the previous hour', now.subtract(1, 'hour')],
                ['the previous day', now.subtract(1, 'day')],
                ['the previous year', now.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(pastDayjs(value, { granularity: 'hour' }), true)
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(pastDayjs(value, { inclusive: true, granularity: 'hour' }), false)
                },
            )

            itEach<[string, unknown]>([
                ['the current date', now],
                ['the previous millisecond', now.subtract(1, 'millisecond')],
                ['the previous hour', now.subtract(1, 'hour')],
                ['the previous day', now.subtract(1, 'day')],
                ['the previous year', now.subtract(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(pastDayjs(value, { inclusive: true, granularity: 'hour' }), true)
            })
        })
    })
})
