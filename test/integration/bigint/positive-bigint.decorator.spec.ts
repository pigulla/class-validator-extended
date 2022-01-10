import 'jest-extended'

import { POSITIVE_BIGINT } from '~'

import { expectValidationError } from '../../util'

import { BigIntTestClass } from './bigint-test-class'

describe('PositiveBigInt', () => {
    describe('positiveBigInt', () => {
        it.each<[unknown]>([[null], [undefined], [42], [BigInt(0)], [BigInt(-42)]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new BigIntTestClass({ positiveBigInt: value }), {
                    property: 'positiveBigInt',
                    constraint: POSITIVE_BIGINT,
                    message: 'positiveBigInt must be a positive BigInt',
                })
            }
        )
    })

    describe('eachPositiveBigInt', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[42]], [[BigInt(5), BigInt(0)]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new BigIntTestClass({ eachPositiveBigInt: value }), {
                    property: 'eachPositiveBigInt',
                    constraint: POSITIVE_BIGINT,
                    message: 'each value in eachPositiveBigInt must be a positive BigInt',
                })
            }
        )
    })
})
