import 'jest-extended'

import {NEGATIVE_BIGINT} from '../../../src'
import {expectValidationError} from '../../util'

import {BigIntTestClass} from './bigint-test-class'

describe('NegativeBigInt', () => {
    describe('negativeBigInt', () => {
        it.each<[unknown]>([[null], [undefined], [42], [BigInt(0)], [BigInt(42)]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new BigIntTestClass({negativeBigInt: value}), {
                    property: 'negativeBigInt',
                    constraint: NEGATIVE_BIGINT,
                    message: 'negativeBigInt must be a negative BigInt',
                })
            }
        )
    })

    describe('eachNegativeBigInt', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[42]], [[BigInt(-5), BigInt(0)]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new BigIntTestClass({eachNegativeBigInt: value}), {
                    property: 'eachNegativeBigInt',
                    constraint: NEGATIVE_BIGINT,
                    message: 'each value in eachNegativeBigInt must be a negative BigInt',
                })
            }
        )
    })
})
