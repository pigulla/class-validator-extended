import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isAwsRegion } from '../../../src'
import { itEach } from '../../util'

describe('isAwsRegion', () => {
    itEach([
        ['us-east-2'],
        ['us-east-1'],
        ['us-west-1'],
        ['us-west-2'],
        ['af-south-1'],
        ['ap-east-1'],
        ['ap-southeast-3'],
        ['ap-south-1'],
        ['ap-northeast-3'],
        ['ap-northeast-2'],
        ['ap-southeast-1'],
        ['ap-southeast-2'],
        ['ap-northeast-1'],
        ['ca-central-1'],
        ['cn-north-1'],
        ['cn-northwest-1'],
        ['eu-central-1'],
        ['eu-west-1'],
        ['eu-west-2'],
        ['eu-south-1'],
        ['eu-west-3'],
        ['eu-north-1'],
        ['me-south-1'],
        ['sa-east-1'],
    ])('should be true for %j', value => {
        assert.equal(isAwsRegion(value), true)
    })

    itEach<[unknown]>([[null], [undefined], [''], ['default'], ['eu-central-0'], ['north-1']])(
        'should be false for %j',
        value => {
            assert.equal(isAwsRegion(value), false)
        },
    )
})
