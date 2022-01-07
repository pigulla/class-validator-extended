import 'jest-extended'

import dayjs = require('dayjs')
import { advanceTo, clear } from 'jest-date-mock'

import { futureDayjs } from '~'

describe('futureDayjs', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeAll(() => {
        advanceTo(now.toDate())
    })

    afterAll(() => {
        clear()
    })

    it.each<[unknown]>([[now.add(1, 'millisecond')], [now.add(7, 'days')]])('should be true for %p', value => {
        expect(futureDayjs(value)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [now], [now.subtract(1, 'millisecond')], [now.add(7, 'days').toDate()]])(
        'should be false for %p',
        value => {
            expect(futureDayjs(value)).toBeFalse()
        }
    )
})
