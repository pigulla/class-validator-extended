import 'jest-extended'

import { IS_AWS_ARN } from '~'
import { expectValidationError } from '~test/util'

import { StringTestClass } from './string-test-class'

describe('IsAwsARN', () => {
    describe('isAwsArn', () => {
        it.each<[unknown]>([
            [null],
            [undefined],
            [42],
            [''],
            ['ARN:aws:clouddirectory:eu-central-1:123456789012:schema/development/cognito'],
            ['arn:aws-xx:clouddirectory:eu-central-1:123456789012:schema/development/cognito'],
            ['arn:aws:3s:eu-central-1:123456789012:schema/development/cognito'],
            ['arn:aws:clouddirectory:eu-central-0:123456789012:schema/development/cognito'],
            ['arn:aws:clouddirectory:eu-central-1:12345678901:schema/development/cognito'],
        ])('should fail validation for %p', value => {
            expectValidationError(new StringTestClass({ isAwsARN: value }), {
                property: 'isAwsARN',
                constraint: IS_AWS_ARN,
                message: `isAwsARN must be an AWS ARN string`,
            })
        })
    })

    describe('eachIsAwsARN', () => {
        it.each<[unknown[]]>([[[undefined]], [['']], [['arn', 'ARN:aws:s3:::bucket_name']]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new StringTestClass({ eachIsAwsARN: value }), {
                    property: 'eachIsAwsARN',
                    constraint: IS_AWS_ARN,
                    message: 'each value in eachIsAwsARN must be an AWS ARN string',
                })
            }
        )
    })
})
