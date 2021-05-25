import 'jest-extended'
import dayjs from 'dayjs'

import {MAX_DAYJS} from '../../../src'
import {expectValidationError} from '../../util'

import {DayjsTestClass} from './dayjs-test-class'

describe('MaxDayjs', () => {
    describe('maxDayjs', () => {
        it.each<[unknown]>([[null], [undefined], [42], [dayjs('2021-01-02T00:00:00.000Z')]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new DayjsTestClass({maxDayjs: value}), {
                    property: 'maxDayjs',
                    constraint: MAX_DAYJS,
                    message: 'maximal allowed date for maxDayjs is $constraint1',
                })
            }
        )
    })

    describe('eachMaxDayjs', () => {
        it.each<[unknown[]]>([
            [[null, dayjs('2020-12-31T23:59:59.999Z')]],
            [[undefined]],
            [[dayjs('2021-01-02T00:00:00.000Z')]],
        ])('should fail validation for %p', value => {
            expectValidationError(new DayjsTestClass({eachMaxDayjs: value}), {
                property: 'eachMaxDayjs',
                constraint: MAX_DAYJS,
                message: 'maximal allowed date for each value in eachMaxDayjs is $constraint1',
            })
        })
    })
})
