import 'jest-extended'

import {ARRAY_MONOTONIC} from '../../../src'
import {expectNoValidationErrors, expectValidationError} from '../../util'

import {ArrayTestClass} from './array-test-class'

describe('ArrayMonotonic', () => {
    it('should validate a valid object', () => {
        expectNoValidationErrors(new ArrayTestClass())
    })

    it('strictlyIncreasingSelector should fail validation', () => {
        expectValidationError(new ArrayTestClass({strictlyIncreasingSelector: null}), {
            constraint: ARRAY_MONOTONIC,
            property: 'strictlyIncreasingSelector',
            message: 'strictlyIncreasingSelector must be a strictly increasing array',
        })
    })

    it('eachStrictlyDecreasingSelector should fail validation', () => {
        expectValidationError(new ArrayTestClass({eachStrictlyDecreasingSelector: [[3, 2, 2, 1]]}), {
            constraint: ARRAY_MONOTONIC,
            property: 'eachStrictlyDecreasingSelector',
            message: 'each value in eachStrictlyDecreasingSelector must be a strictly decreasing array',
        })
    })
})
