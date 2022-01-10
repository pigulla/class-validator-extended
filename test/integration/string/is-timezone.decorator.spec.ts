import 'jest-extended'

import { IS_TIMEZONE } from '~'

import { expectValidationError } from '../../util'

import { StringTestClass } from './string-test-class'

describe('IsTimezone', () => {
    describe('isTimezone', () => {
        it.each<[unknown]>([[null], [undefined], [42], [''], ['Bad Salzufflen']])(
            'should fail validation for %p',
            value => {
                expectValidationError(new StringTestClass({ isTimezone: value }), {
                    property: 'isTimezone',
                    constraint: IS_TIMEZONE,
                    message: `isTimezone must be a valid timezone string`,
                })
            }
        )
    })

    describe('eachIsTimezone', () => {
        it.each<[unknown[]]>([[[undefined]], [['']], [['UTC', 'Bad Salzufflen']]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new StringTestClass({ eachIsTimezone: value }), {
                    property: 'eachIsTimezone',
                    constraint: IS_TIMEZONE,
                    message: 'each value in eachIsTimezone must be a valid timezone string',
                })
            }
        )
    })
})
