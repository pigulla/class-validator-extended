import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

import { isValidDuration } from '~/dayjs/is-valid-duration'

describe('isValidDuration', () => {
    it.each<[string, Duration]>([
        ['the "empty" duration', dayjs.duration(0)],
        ['one hour', dayjs.duration(1, 'hour')],
        ['seven days and one week', dayjs.duration({ weeks: 1, days: 7 })],
    ])('should return true for %s', (_, value) => {
        expect(isValidDuration(value)).toBeTrue()
    })

    it.each<[string, Duration]>([
        ['an invalid duration', dayjs.duration('PxD')],
        ['a negative duration', dayjs.duration(-5, 'minutes')],
    ])('should return false for %s', (_, value) => {
        expect(isValidDuration(value)).toBeFalse()
    })
})
