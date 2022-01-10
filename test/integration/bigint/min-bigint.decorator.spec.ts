import 'jest-extended'

import { MIN_BIGINT } from '~'
import { expectNoValidationErrors, expectValidationError } from '~test/util'

import { BigIntTestClass } from './bigint-test-class'

describe('MinBigInt', () => {
    it('should validate when the value is exactly the minimum', () => {
        expectNoValidationErrors(new BigIntTestClass({ minBigInt: BigInt(50) }))
    })

    describe('minBigInt', () => {
        it.each<[unknown]>([[null], [undefined], [42], [BigInt(49)]])('should fail validation for %p', value => {
            expectValidationError(new BigIntTestClass({ minBigInt: value }), {
                property: 'minBigInt',
                constraint: MIN_BIGINT,
                message: 'minBigInt must not be less than $constraint1',
            })
        })
    })

    describe('eachMinBigInt', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[42]], [[BigInt(100), BigInt(0)]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new BigIntTestClass({ eachMinBigInt: value }), {
                    property: 'eachMinBigInt',
                    constraint: MIN_BIGINT,
                    message: 'each value in eachMinBigInt must not be less than $constraint1',
                })
            }
        )
    })
})
