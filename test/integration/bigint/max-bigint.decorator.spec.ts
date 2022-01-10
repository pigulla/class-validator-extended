import 'jest-extended'

import { MAX_BIGINT } from '~'

import { expectNoValidationErrors, expectValidationError } from '../../util'

import { BigIntTestClass } from './bigint-test-class'

describe('MaxBigInt', () => {
    it('should validate when the value is exactly the maximum', () => {
        expectNoValidationErrors(new BigIntTestClass({ maxBigInt: BigInt(1_000) }))
    })

    describe('maxBigInt', () => {
        it.each<[unknown]>([[null], [undefined], [42], [BigInt(2_000)]])(' should fail validation for %p', value => {
            expectValidationError(new BigIntTestClass({ maxBigInt: value }), {
                property: 'maxBigInt',
                constraint: MAX_BIGINT,
                message: 'maxBigInt must not be more than $constraint1',
            })
        })
    })

    describe('eachMaxBigInt', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[42]], [[BigInt(2_000), BigInt(3_000)]]])(
            'eachMaxBigInt should fail validation for %p',
            value => {
                expectValidationError(new BigIntTestClass({ eachMaxBigInt: value }), {
                    property: 'eachMaxBigInt',
                    constraint: MAX_BIGINT,
                    message: 'each value in eachMaxBigInt must not be more than $constraint1',
                })
            }
        )
    })
})
