import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'

import dayjs from 'dayjs'

import { minDuration } from '../../../src'
import { itEach } from '../../util'
import { withoutDurationPlugin } from '../../without-duration-plugin'

describe('minDuration', () => {
    const minimum = dayjs.duration(1, 'hour')
    const invalidDurationObjects: [string, unknown][] = [
        ['an invalid duration', dayjs.duration('PxD')],
        ['a negative duration', dayjs.duration(-5, 'hour')],
    ]

    it('should throw if "minimum" is an invalid duration object', () => {
        assert.throws(
            () => minDuration(dayjs.duration(1, 'hour'), dayjs.duration('PxD')),
            TypeError,
        )
    })

    describe('with default options', () => {
        itEach<[string, unknown]>([
            ...invalidDurationObjects,
            ['a shorter duration', minimum.subtract(5, 'minutes')],
            ['the minimum value itself', minimum],
        ])('should be false for %s', (_, value) => {
            assert.equal(minDuration(value, minimum), false)
        })

        itEach<[string, unknown]>([['a longer duration', minimum.add(5, 'minutes')]])(
            'should be true for %s',
            (_, value) => {
                assert.equal(minDuration(value, minimum), true)
            },
        )

        describe('and "inclusive" set to true', () => {
            itEach<[string, unknown]>([
                ...invalidDurationObjects,
                ['a shorter duration', minimum.subtract(5, 'minutes')],
            ])('should be false for %s', (_, value) => {
                assert.equal(minDuration(value, minimum, { inclusive: true }), false)
            })

            itEach<[string, unknown]>([
                ['the minimum value itself', minimum],
                ['a longer duration', minimum.add(5, 'minutes')],
            ])('should be true for %s', (_, value) => {
                assert.equal(minDuration(value, minimum, { inclusive: true }), true)
            })
        })
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            assert.throws(
                () => minDuration(42, minimum),
                /The Dayjs "duration" plugin is not loaded/,
            )
        })
    })
})
