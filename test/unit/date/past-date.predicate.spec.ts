import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { pastDate } from '~'

describe('pastDate', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeAll(() => {
        advanceTo(now.toDate())
    })

    afterAll(() => {
        clear()
    })

    it.each<[unknown]>([[now.subtract(1, 'millisecond').toDate()], [now.subtract(7, 'days').toDate()]])(
        'should be true for %p',
        value => {
            expect(pastDate(value)).toBeTrue()
        }
    )

    it.each<[unknown]>([[undefined], [null], [now], [now.add(1, 'millisecond').toDate()]])(
        'should be false for %p',
        value => {
            expect(pastDate(value)).toBeFalse()
        }
    )
})
