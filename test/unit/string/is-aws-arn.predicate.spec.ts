import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isAwsARN } from '../../../src'
import { itEach } from '../../util'

describe('isAwsARN', () => {
    itEach([
        ['arn:aws:s3:::bucket_name'],
        ['arn:aws:s3:::bucket_name/key_name'],
        ['arn:aws:clouddirectory:us-west-2:123456789012:directory/ARIqk1HD-UjdtmcIrJHEvPI/schema/cognito/1.0/XYZ'],
        ['arn:aws:clouddirectory:us-west-2:123456789012:schema/published/cognito/1.0/XYZ/published/cognito/1.0'],
        ['arn:aws:clouddirectory:us-west-2:123456789012:schema/published/cognito/1.0'],
        ['arn:aws:clouddirectory:eu-central-1:123456789012:schema/development/cognito'],
    ])('should be true for %j', value => {
        assert.equal(isAwsARN(value), true)
    })

    itEach<[unknown]>([
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
    ])('should be false for %j', value => {
        assert.equal(isAwsARN(value), false)
    })
})
