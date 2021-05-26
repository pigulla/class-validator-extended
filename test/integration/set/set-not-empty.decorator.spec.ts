import 'jest-extended'

import {SET_NOT_EMPTY} from '../../../src'
import {expectValidationError} from '../../util'

import {SetTestClass} from './set-test-class'

describe('SetNotEmpty', () => {
    describe('setNotEmpty', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()]])('should fail validation for %p', value => {
            expectValidationError(new SetTestClass({setNotEmpty: value}), {
                property: 'setNotEmpty',
                constraint: SET_NOT_EMPTY,
                message: 'setNotEmpty should not be an empty set',
            })
        })
    })

    describe('eachSetNotEmpty', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[new Set()]], [[new Set([1]), new Map()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({eachSetNotEmpty: value}), {
                    property: 'eachSetNotEmpty',
                    constraint: SET_NOT_EMPTY,
                    message: 'each value in eachSetNotEmpty should not be an empty set',
                })
            }
        )
    })
})
