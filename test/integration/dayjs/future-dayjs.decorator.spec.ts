import 'jest-extended'
import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { FUTURE_DAYJS } from '~'

import { expectValidationError } from '../../util'

import { DayjsTestClass } from './dayjs-test-class'

describe('FutureDayjs', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeEach(() => {
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    it.each<[unknown]>([[null], [undefined], [42], [now], [now.subtract(1, 'minute')]])(
        'futureDayjs should fail validation for %p',
        value => {
            expectValidationError(new DayjsTestClass({ futureDayjs: value }), {
                property: 'futureDayjs',
                constraint: FUTURE_DAYJS,
                message: 'futureDayjs must be a Dayjs instance in the future',
            })
        }
    )

    it.each<[unknown[]]>([[[null, now.subtract(1, 'minute')]], [[undefined]], [[now]]])(
        'eachFutureDayjs should fail validation for %p',
        value => {
            expectValidationError(new DayjsTestClass({ eachFutureDayjs: value }), {
                property: 'eachFutureDayjs',
                constraint: FUTURE_DAYJS,
                message: 'each value in eachFutureDayjs must be a Dayjs instance in the future',
            })
        }
    )
})
