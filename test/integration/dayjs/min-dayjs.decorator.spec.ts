import 'jest-extended'
import dayjs from 'dayjs'

import {MIN_DAYJS} from '../../../src'
import {expectValidationError} from '../../util'

import {DayjsTestClass} from './dayjs-test-class'

describe('MinDayjs', () => {
    describe('minDayjs', () => {
        it.each<[unknown]>([[null], [undefined], [42], [dayjs('2020-12-31T23:59:59.999Z')]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DayjsTestClass({minDayjs: value}), {
                    property: 'minDayjs',
                    constraint: MIN_DAYJS,
                    message: 'minimal allowed date for minDayjs is $constraint1',
                })
            }
        )
    })

    describe('eachMinDayjs', () => {
        it.each<[unknown[]]>([
            [[null, dayjs('2021-01-02T00:00:00.000Z')]],
            [[undefined]],
            [[dayjs('2020-12-31T23:59:59.999Z')]],
        ])('should fail validation for %p', value => {
            expectValidationError(new DayjsTestClass({eachMinDayjs: value}), {
                property: 'eachMinDayjs',
                constraint: MIN_DAYJS,
                message: 'minimal allowed date for each value in eachMinDayjs is $constraint1',
            })
        })
    })
})
