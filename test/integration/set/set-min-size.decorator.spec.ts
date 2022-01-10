import 'jest-extended'

import { SET_MIN_SIZE } from '~'
import { expectValidationError } from '~test/util'

import { SetTestClass } from './set-test-class'

describe('SetMinSize', () => {
    describe('setMinSize', () => {
        it.each<[unknown]>([[null], [undefined], [new Map()], [new Set()]])('should fail validation for %p', value => {
            expectValidationError(new SetTestClass({ setMinSize: value }), {
                property: 'setMinSize',
                constraint: SET_MIN_SIZE,
                message: 'setMinSize must contain at least $constraint1 elements',
            })
        })
    })

    describe('eachSetMinSize', () => {
        it.each<[unknown[]]>([[[null]], [[undefined]], [[new Map()]], [[new Set([]), new Set([])]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({ eachSetMinSize: value }), {
                    property: 'eachSetMinSize',
                    constraint: SET_MIN_SIZE,
                    message: 'each value in eachSetMinSize must contain at least $constraint1 elements',
                })
            }
        )
    })
})
