import 'jest-extended'

import dayjs from 'dayjs'

import { IS_DAYJS } from '~'
import { expectNoValidationErrors, expectValidationError } from '~test/util'

import { DayjsTestClass } from './dayjs-test-class'

describe('IsDayjs', () => {
    it('should accept a valid Dayjs instance where an invalid one is sufficient', () => {
        expectNoValidationErrors(
            new DayjsTestClass({
                isDayjsInvalid: dayjs('2020-05-19T00:00:00.000Z'),
            })
        )
    })

    it('should require each item to be a Dayjs object', () => {
        expectValidationError(
            new DayjsTestClass({
                eachIsDayjsInvalid: [dayjs('2020-05-19T00:00:00.000Z'), null],
            }),
            {
                property: 'eachIsDayjsInvalid',
                constraint: IS_DAYJS,
                message: `each value in eachIsDayjsInvalid must be a Dayjs object`,
            }
        )
    })

    it.each<[unknown]>([[null], [undefined], [42], [dayjs('not a valid date')]])(
        'isDayjs should fail validation for %p',
        value => {
            expectValidationError(new DayjsTestClass({ isDayjs: value }), {
                property: 'isDayjs',
                constraint: IS_DAYJS,
                message: `isDayjs must be a valid Dayjs object`,
            })
        }
    )

    it.each<[unknown[]]>([[[dayjs(), dayjs('not a valid date')]], [[undefined]], [[dayjs('not a valid date')]]])(
        'eachIsDayjs should fail validation for %p',
        value => {
            expectValidationError(new DayjsTestClass({ eachIsDayjs: value }), {
                property: 'eachIsDayjs',
                constraint: IS_DAYJS,
                message: 'each value in eachIsDayjs must be a valid Dayjs object',
            })
        }
    )
})
