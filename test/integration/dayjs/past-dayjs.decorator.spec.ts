import 'jest-extended'
import dayjs from 'dayjs'
import {advanceTo, clear} from 'jest-date-mock'

import {PAST_DAYJS} from '../../../src'
import {expectValidationError} from '../../util'

import {DayjsTestClass} from './dayjs-test-class'

describe('PastDayjs', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeEach(() => {
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    describe('pastDayjs', () => {
        it.each<[unknown]>([[null], [undefined], [42], [now], [now.add(1, 'minute')]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DayjsTestClass({pastDayjs: value}), {
                    property: 'pastDayjs',
                    constraint: PAST_DAYJS,
                    message: 'pastDayjs must be a Dayjs instance in the past',
                })
            }
        )
    })

    describe('eachPastDayjs', () => {
        it.each<[unknown[]]>([[[null, now.add(1, 'hour')]], [[undefined]], [[now]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DayjsTestClass({eachPastDayjs: value}), {
                    property: 'eachPastDayjs',
                    constraint: PAST_DAYJS,
                    message: 'each value in eachPastDayjs must be a Dayjs instance in the past',
                })
            }
        )
    })
})
