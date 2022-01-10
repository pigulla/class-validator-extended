import 'jest-extended'
import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { FUTURE_DATE } from '~'
import { expectValidationError } from '~test/util'

import { DateTestClass } from './date-test-class'

describe('FutureDate', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeEach(() => {
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    describe('futureDate', () => {
        it.each<[unknown]>([[null], [undefined], [42], [now.toDate()], [now.subtract(1, 'minute').toDate()]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DateTestClass({ futureDate: value }), {
                    property: 'futureDate',
                    constraint: FUTURE_DATE,
                    message: 'futureDate must be a Date instance in the future',
                })
            }
        )
    })

    describe('eachFutureDate', () => {
        it.each<[unknown[]]>([[[null, now.subtract(1, 'minute').toDate()]], [[undefined]], [[now.toDate()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DateTestClass({ eachFutureDate: value }), {
                    property: 'eachFutureDate',
                    constraint: FUTURE_DATE,
                    message: 'each value in eachFutureDate must be a Date instance in the future',
                })
            }
        )
    })
})
