import 'jest-extended'

import { isAwsARN } from '~'

describe('isAwsARN', () => {
    it.each([
        ['arn:aws:s3:::bucket_name'],
        ['arn:aws:s3:::bucket_name/key_name'],
        ['arn:aws:clouddirectory:us-west-2:123456789012:directory/ARIqk1HD-UjdtmcIrJHEvPI/schema/cognito/1.0/XYZ'],
        ['arn:aws:clouddirectory:us-west-2:123456789012:schema/published/cognito/1.0/XYZ/published/cognito/1.0'],
        ['arn:aws:clouddirectory:us-west-2:123456789012:schema/published/cognito/1.0'],
        ['arn:aws:clouddirectory:eu-central-1:123456789012:schema/development/cognito'],
    ])('should be true for %p', value => {
        expect(isAwsARN(value)).toBeTrue()
    })

    it.each([
        [null],
        [undefined],
        [''],
        ['default'],
        ['arn'],
        ['ARN:aws:clouddirectory:eu-central-1:123456789012:schema/development/cognito'],
        ['arn:aws-xx:clouddirectory:eu-central-1:123456789012:schema/development/cognito'],
        ['arn:aws:3s:eu-central-1:123456789012:schema/development/cognito'],
        ['arn:aws:clouddirectory:eu-central-0:123456789012:schema/development/cognito'],
        ['arn:aws:clouddirectory:eu-central-1:12345678901:schema/development/cognito'],
    ])('should be false for %p', value => {
        expect(isAwsARN(value)).toBeFalse()
    })
})
