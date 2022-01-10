import 'jest-extended'

import { SET_CONTAINS } from '~'
import { expectValidationError } from '~test/util'

import { SetTestClass } from './set-test-class'

describe('SetContains', () => {
    describe('setContains', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()], [new Set([[42, 'bla']])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({ setContains: value }), {
                    property: 'setContains',
                    constraint: SET_CONTAINS,
                    message: 'setContains must contain $constraint1 values',
                })
            }
        )
    })

    describe('eachSetContains', () => {
        it.each<[unknown[]]>([[[null]], [[undefined]], [[new Set()]], [[new Set([[42, 'bla']]), new Map()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({ eachSetContains: value }), {
                    property: 'eachSetContains',
                    constraint: SET_CONTAINS,
                    message: 'each value in eachSetContains must contain $constraint1 values',
                })
            }
        )
    })
})
