import 'jest-extended'

import dayjs = require('dayjs')
import { advanceTo, clear } from 'jest-date-mock'

import { pastDayjs } from '~'

describe('pastDayjs', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeAll(() => {
        advanceTo(now.toDate())
    })

    afterAll(() => {
        clear()
    })

    it.each<[unknown]>([[now.subtract(1, 'millisecond')], [now.subtract(7, 'days')]])(
        'should be true for %p',
        value => {
            expect(pastDayjs(value)).toBeTrue()
        }
    )

    it.each<[unknown]>([[undefined], [null], [now], [now.add(1, 'millisecond')], [now.subtract(1, 'hour').toDate()]])(
        'should be false for %p',
        value => {
            expect(pastDayjs(value)).toBeFalse()
        }
    )
})
