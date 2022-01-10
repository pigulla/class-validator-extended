import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { futureDate } from '~'

describe('futureDate', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeAll(() => {
        advanceTo(now.toDate())
    })

    afterAll(() => {
        clear()
    })

    it.each<[unknown]>([[now.add(1, 'millisecond').toDate()], [now.add(7, 'days').toDate()]])(
        'should be true for %p',
        value => {
            expect(futureDate(value)).toBeTrue()
        }
    )

    it.each<[unknown]>([[undefined], [null], [now], [now.subtract(1, 'millisecond').toDate()]])(
        'should be false for %p',
        value => {
            expect(futureDate(value)).toBeFalse()
        }
    )
})
