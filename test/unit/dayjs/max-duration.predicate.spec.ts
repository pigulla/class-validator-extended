import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'

import dayjs from 'dayjs'

import { maxDuration } from '../../../src'
import { itEach } from '../../util'
import { withoutDurationPlugin } from '../../without-duration-plugin'

describe('maxDuration', () => {
    const maximum = dayjs.duration(1, 'hour')
    const invalidDurationObjects: [string, unknown][] = [
        ['an invalid duration', dayjs.duration('PxD')],
    ]

    it('should throw if "maximum" is an invalid duration object', () => {
        assert.throws(
            () => maxDuration(dayjs.duration(1, 'hour'), dayjs.duration('PxD')),
            TypeError,
        )
    })

    describe('with default options', () => {
        itEach<[string, unknown]>([
            ...invalidDurationObjects,
            ['a longer duration', maximum.add(5, 'minutes')],
            ['the maximum value itself', maximum],
        ])('should be false for %s', (_, value) => {
            assert.equal(maxDuration(value, maximum), false)
        })

        itEach<[string, unknown]>([['a shorter duration', maximum.subtract(5, 'minutes')]])(
            'should be true for %s',
            (_, value) => {
                assert.equal(maxDuration(value, maximum), true)
            },
        )

        describe('and "inclusive" set to true', () => {
            itEach<[string, unknown]>([
                ...invalidDurationObjects,
                ['a longer duration', maximum.add(5, 'minutes')],
            ])('should be false for %s', (_, value) => {
                assert.equal(maxDuration(value, maximum, { inclusive: true }), false)
            })

            itEach<[string, unknown]>([
                ['the maximum value itself', maximum],
                ['a shorter duration', maximum.subtract(5, 'minutes')],
            ])('should be true for %s', (_, value) => {
                assert.equal(maxDuration(value, maximum, { inclusive: true }), true)
            })
        })
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            assert.throws(
                () => maxDuration(42, maximum),
                /The Dayjs "duration" plugin is not loaded/,
            )
        })
    })
})
