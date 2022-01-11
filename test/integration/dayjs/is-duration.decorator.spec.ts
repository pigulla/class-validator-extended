import dayjs from 'dayjs'
import 'jest-extended'

import { IS_DURATION } from '~'
import { expectValidationError } from '~test/util'

import { DayjsTestClass } from './dayjs-test-class'

describe('IsDuration', () => {
    describe('isDuration', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [42],
            [new Date('2021-01-01T00:00:00.000Z')],
            [dayjs('2021-01-01T00:00:00.000Z')],
        ])('should fail validation for %p', value => {
            expectValidationError(new DayjsTestClass({ isDuration: value }), {
                property: 'isDuration',
                constraint: IS_DURATION,
                message: `isDuration must be a Dayjs duration object`,
            })
        })
    })

    describe('eachIsDuration', () => {
        it.each<[unknown[]]>([
            [[BigInt(10), 42]],
            [[undefined]],
            [[42]],
            [[new Date('2021-01-01T00:00:00.000Z')]],
            [[dayjs('2021-01-01T00:00:00.000Z')]],
        ])('should fail validation for %p', value => {
            expectValidationError(new DayjsTestClass({ eachIsDuration: value }), {
                property: 'eachIsDuration',
                constraint: IS_DURATION,
                message: 'each value in eachIsDuration must be a Dayjs duration object',
            })
        })
    })
})
