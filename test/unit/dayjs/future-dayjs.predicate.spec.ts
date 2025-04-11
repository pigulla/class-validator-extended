import assert from 'node:assert/strict'
import { describe, before, after, mock } from 'node:test'

import dayjs from 'dayjs'

import { futureDayjs } from '../../../src'
import { itEach } from '../../util'

describe('futureDayjs', () => {
    const now = dayjs('2020-05-01T06:30:00.000Z')
    const notDayjsObjects: [string, unknown][] = [
        ['undefined', undefined],
        ['null', null],
        ['an ISO string', '2020-05-01T06:00:00.000Z'],
        ['a Date object', new Date('2020-05-01T06:00:00.000Z')],
    ]
    const invalidDayjsObjects: [string, unknown][] = [['an invalid Dayjs object', dayjs('2020-05-01T00:99:00.000Z')]]

    before(() => {
        mock.timers.enable({ apis: ['Date'], now: now.toDate() })
    })

    after(() => {
        mock.timers.reset()
    })

    describe('with default options', () => {
        itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', now]])(
            'should be false for %s',
            (_, value) => {
                assert.equal(futureDayjs(value), false)
            }
        )

        itEach<[string, unknown]>([
            ['the next millisecond', now.add(1, 'millisecond')],
            ['the next day', now.add(1, 'day')],
            ['the next year', now.add(1, 'year')],
        ])('should be true for %s', (_, value) => {
            assert.equal(futureDayjs(value), true)
        })

        describe('and allow_invalid set to true', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects, ['the current date', now]])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(futureDayjs(value), false)
                }
            )

            itEach<[string, unknown]>([
                ['the next millisecond', now.add(1, 'millisecond')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(futureDayjs(value), true)
            })
        })

        describe('and inclusive set to true', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(futureDayjs(value, { inclusive: true }), false)
                }
            )

            itEach<[string, unknown]>([
                ['the current date', now],
                ['the next millisecond', now.add(1, 'millisecond')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(futureDayjs(value, { inclusive: true }), true)
            })
        })

        describe('with a granularity of "hour"', () => {
            itEach<[string, unknown]>([
                ...notDayjsObjects,
                ...invalidDayjsObjects,
                ['the current date', now],
                ['the next millisecond', now.add(1, 'millisecond')],
            ])('should be false for %s', (_, value) => {
                assert.equal(futureDayjs(value, { granularity: 'hour' }), false)
            })

            itEach<[string, unknown]>([
                ['the next hour', now.add(1, 'hour')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(futureDayjs(value, { granularity: 'hour' }), true)
            })
        })

        describe('and inclusive set to true with a granularity of "hour"', () => {
            itEach<[string, unknown]>([...notDayjsObjects, ...invalidDayjsObjects])(
                'should be false for %s',
                (_, value) => {
                    assert.equal(futureDayjs(value, { inclusive: true, granularity: 'hour' }), false)
                }
            )

            itEach<[string, unknown]>([
                ['the current date', now],
                ['the next millisecond', now.add(1, 'millisecond')],
                ['the next hour', now.add(1, 'hour')],
                ['the next day', now.add(1, 'day')],
                ['the next year', now.add(1, 'year')],
            ])('should be true for %s', (_, value) => {
                assert.equal(futureDayjs(value, { inclusive: true, granularity: 'hour' }), true)
            })
        })
    })
})
