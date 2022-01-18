import dayjs from 'dayjs'

import { createDuration } from '~/dayjs/create-duration'
import { withoutDurationPlugin } from '~test/without-duration-plugin'

describe('createDuration', () => {
    it.each<[string, ...Parameters<typeof createDuration>]>([
        ['a Duration object', dayjs.duration(1, 'hour')],
        ['an ISO 8601 string', 'PT1H'],
        ['a units object', { hours: 1 }],
        ['a time/unit tuple', [60, 'minute']],
    ])('should return a duration object for %s', (_, value) => {
        expect(createDuration(value).asMilliseconds()).toBe(60 * 60 * 1_000)
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            expect(() => createDuration('PT1H')).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
