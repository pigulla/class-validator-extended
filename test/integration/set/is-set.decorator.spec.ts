import 'jest-extended'

import {IS_SET} from '../../../src'
import {expectValidationError} from '../../util'

import {SetTestClass} from './set-test-class'

describe('IsSet', () => {
    describe('isSet', () => {
        it.each<[unknown]>([[null], [undefined], [new Map()]])('should fail validation for %p', value => {
            expectValidationError(new SetTestClass({isSet: value}), {
                property: 'isSet',
                constraint: IS_SET,
                message: 'isSet must be a Set instance',
            })
        })
    })

    describe('eachIsSet', () => {
        it.each<[unknown[]]>([[[null]], [[undefined]], [[new Map()]], [[new Map(), new Set()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new SetTestClass({eachIsSet: value}), {
                    property: 'eachIsSet',
                    constraint: IS_SET,
                    message: 'each value in eachIsSet must be a Set instance',
                })
            }
        )
    })
})
