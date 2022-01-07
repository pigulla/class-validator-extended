import 'jest-extended'

import { expectValidationError } from '../../util'

import { BigIntTestClass } from './bigint-test-class'

import { IS_BIGINT } from '~'

describe('IsBigInt', () => {
    describe('isBigInt', () => {
        it.each<[unknown]>([[null], [undefined], [42]])('should fail validation for %p', value => {
            expectValidationError(new BigIntTestClass({ isBigInt: value }), {
                property: 'isBigInt',
                constraint: IS_BIGINT,
                message: `isBigInt must be a BigInt`,
            })
        })
    })

    describe('eachIsBigInt', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[42]]])('should fail validation for %p', value => {
            expectValidationError(new BigIntTestClass({ eachIsBigInt: value }), {
                property: 'eachIsBigInt',
                constraint: IS_BIGINT,
                message: 'each value in eachIsBigInt must be a BigInt',
            })
        })
    })
})
