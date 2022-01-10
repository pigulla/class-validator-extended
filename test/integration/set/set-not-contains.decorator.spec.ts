import 'jest-extended'

import { SET_NOT_CONTAINS } from '~'

import { expectValidationError } from '../../util'

import { SetTestClass } from './set-test-class'

describe('SetNotContains', () => {
    describe('setNotContains', () => {
        it.each<[unknown]>([[null], [undefined], [new Map()], [new Set([13, 'baz'])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({ setNotContains: value }), {
                    property: 'setNotContains',
                    constraint: SET_NOT_CONTAINS,
                    message: 'setNotContains should not contain $constraint1 values',
                })
            }
        )
    })

    describe('eachSetNotContains', () => {
        it.each<[unknown[]]>([
            [[null]],
            [[undefined]],
            [[new Set([7, 8, 9])]],
            [[new Set(['foo', 0, 7]), new Set([1, 2, 3])]],
            [[new Map([[0, 1]]), new Map()]],
        ])('should fail validation for %p', value => {
            expectValidationError(new SetTestClass({ eachSetNotContains: value }), {
                property: 'eachSetNotContains',
                constraint: SET_NOT_CONTAINS,
                message: 'each value in eachSetNotContains should not contain $constraint1 values',
            })
        })
    })
})
