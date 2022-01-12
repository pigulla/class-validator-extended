import 'jest-extended'

import { IS_AWS_REGION } from '~'
import { expectValidationError } from '~test/util'

import { StringTestClass } from './string-test-class'

describe('IsAwsRegion', () => {
    describe('isAwsRegion', () => {
        it.each<[unknown]>([[null], [undefined], [42], [''], ['eu'], ['eu-42'], ['eu-central-0']])(
            'should fail validation for %p',
            value => {
                expectValidationError(new StringTestClass({ isAwsRegion: value }), {
                    property: 'isAwsRegion',
                    constraint: IS_AWS_REGION,
                    message: `isAwsRegion must be an AWS region string`,
                })
            }
        )
    })

    describe('eachIsAwsRegion', () => {
        it.each<[unknown[]]>([[[undefined]], [['']], [['eu-central-0', 'eu-central-1']]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new StringTestClass({ eachIsAwsRegion: value }), {
                    property: 'eachIsAwsRegion',
                    constraint: IS_AWS_REGION,
                    message: 'each value in eachIsAwsRegion must be an AWS region string',
                })
            }
        )
    })
})
