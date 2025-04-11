import assert from 'node:assert/strict'
import { describe, beforeEach, afterEach, it } from 'node:test'

import dayjs from 'dayjs'

import { createDuration } from '../../../src/dayjs/create-duration'
import { itEach } from '../../util'
import { withoutDurationPlugin } from '../../without-duration-plugin'

describe('createDuration', () => {
    itEach<[string, ...Parameters<typeof createDuration>]>([
        ['a Duration object', dayjs.duration(1, 'hour')],
        ['an ISO 8601 string', 'PT1H'],
        ['a units object', { hours: 1 }],
        ['a time/unit tuple', [60, 'minute']],
    ])('should return a duration object for %s', (_, value) => {
        assert.equal(createDuration(value).asMilliseconds(), 60 * 60 * 1_000)
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            assert.throws(() => createDuration('PT1H'), /The Dayjs "duration" plugin is not loaded/)
        })
    })
})
