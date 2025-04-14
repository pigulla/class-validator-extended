import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'

import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

import { isDuration } from '../../../src/type'
import { itEach } from '../../util'
import { withoutDurationPlugin } from '../../without-duration-plugin'

describe('isDuration', () => {
    // @ts-expect-error
    const invalidDuration = dayjs.duration('fourtytwo', 'minutes')

    describe('with default options', () => {
        itEach<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs('2020-07-20T08:12:58.536Z')],
            ['foo'],
            [invalidDuration],
        ])('should be false for %s', (value: unknown) => {
            assert.equal(isDuration(value), false)
        })

        itEach<[Duration]>([
            [dayjs.duration(42, 'minutes')],
            // @ts-expect-error
            [dayjs.duration()],
        ])('should be true for %s', value => {
            assert.equal(isDuration(value), true)
        })
    })

    describe('with allow_invalid set to false', () => {
        itEach<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs('2020-07-20T08:12:58.536Z')],
            ['foo'],
            [invalidDuration],
        ])('should be false for %s', (value: unknown) => {
            assert.equal(isDuration(value, { allow_invalid: false }), false)
        })

        itEach<[Duration]>([
            [dayjs.duration(42, 'minutes')],
            // @ts-expect-error
            [dayjs.duration()],
        ])('should be true for %s', value => {
            assert.equal(isDuration(value, { allow_invalid: false }), true)
        })
    })

    describe('with allow_invalid set to true', () => {
        itEach<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs('2020-07-20T08:12:58.536Z')],
            ['foo'],
        ])('should be false for %s', (value: unknown) => {
            assert.equal(isDuration(value, { allow_invalid: true }), false)
        })

        itEach<[Duration]>([
            [dayjs.duration(42, 'minutes')],
            // @ts-expect-error
            [dayjs.duration()],
            [invalidDuration],
        ])('should be true for %s', value => {
            assert.equal(isDuration(value, { allow_invalid: true }), true)
        })
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        before(setup)
        after(restore)

        it('should throw', () => {
            assert.throws(() => isDuration(42), /The Dayjs "duration" plugin is not loaded/)
        })
    })
})
