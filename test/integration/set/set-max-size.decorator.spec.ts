import 'jest-extended'

import { expectValidationError } from '../../util'

import { SetTestClass } from './set-test-class'

import { SET_MAX_SIZE } from '~'

describe('SetMaxSize', () => {
    describe('setMaxSize', () => {
        it.each<[unknown]>([[null], [undefined], [new Map()], [new Set([[], [1], [null, false, 0]])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({ setMaxSize: value }), {
                    property: 'setMaxSize',
                    constraint: SET_MAX_SIZE,
                    message: 'setMaxSize must contain not more than $constraint1 elements',
                })
            }
        )
    })

    describe('eachSetMaxSize', () => {
        it.each<[unknown[]]>([[[null]], [[undefined]], [[new Map()]], [[new Set([[], [1], [null, false, 0]])]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({ eachSetMaxSize: value }), {
                    property: 'eachSetMaxSize',
                    constraint: SET_MAX_SIZE,
                    message: 'each value in eachSetMaxSize must contain not more than $constraint1 elements',
                })
            }
        )
    })
})
