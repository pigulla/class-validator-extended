import assert from 'node:assert/strict'
import { describe } from 'node:test'

import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

import { isValidDuration } from '../../../src/dayjs/is-valid-duration'
import { itEach } from '../../util'

describe('isValidDuration', () => {
    itEach<[string, Duration]>([
        ['the "empty" duration', dayjs.duration(0)],
        ['one hour', dayjs.duration(1, 'hour')],
        ['seven days and one week', dayjs.duration({ weeks: 1, days: 7 })],
    ])('should return true for %s', (_, value) => {
        assert.equal(isValidDuration(value), true)
    })

    itEach<[string, Duration]>([['an invalid duration', dayjs.duration('PxD')]])(
        'should return false for %s',
        (_, value) => {
            assert.equal(isValidDuration(value), false)
        }
    )
})
