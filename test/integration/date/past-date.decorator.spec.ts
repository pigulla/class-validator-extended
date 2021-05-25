import 'jest-extended'
import dayjs from 'dayjs'
import {advanceTo, clear} from 'jest-date-mock'

import {PAST_DATE} from '../../../src'
import {expectValidationError} from '../../util'

import {DateTestClass} from './date-test-class'

describe('PastDate', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    beforeEach(() => {
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    describe('pastDate', () => {
        it.each<[unknown]>([[null], [undefined], [42], [now.toDate()], [now.add(1, 'minute').toDate()]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DateTestClass({pastDate: value}), {
                    property: 'pastDate',
                    constraint: PAST_DATE,
                    message: 'pastDate must be a Date instance in the past',
                })
            }
        )
    })

    describe('eachPastDate', () => {
        it.each<[unknown[]]>([[[null, now.add(1, 'hour').toDate()]], [[undefined]], [[now.toDate()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DateTestClass({eachPastDate: value}), {
                    property: 'eachPastDate',
                    constraint: PAST_DATE,
                    message: 'each value in eachPastDate must be a Date instance in the past',
                })
            }
        )
    })
})
