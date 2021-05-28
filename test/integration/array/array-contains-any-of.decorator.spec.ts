import 'jest-extended'

import {ARRAY_CONTAINS_ANY_OF} from '../../../src'
import {expectValidationError} from '../../util'

import {ArrayTestClass} from './array-test-class'

describe('ArrayContainsAnyOf', () => {
    it('arrayContainsAnyOf should fail validation for null', () => {
        expectValidationError(new ArrayTestClass({arrayContainsAnyOf: null}), {
            constraint: ARRAY_CONTAINS_ANY_OF,
            property: 'arrayContainsAnyOf',
            message: 'arrayContainsAnyOf must include at least one of $constraint1',
        })
    })

    it('arrayContainsAnyTwoOf should fail validation if only one is present', () => {
        expectValidationError(new ArrayTestClass({arrayContainsAnyTwoOf: [['a', 'f']]}), {
            constraint: ARRAY_CONTAINS_ANY_OF,
            property: 'arrayContainsAnyTwoOf',
            message: 'arrayContainsAnyTwoOf must include at least 2 of $constraint1',
        })
    })

    it('arrayContainsAnyOf should fail validation for an empty array', () => {
        expectValidationError(new ArrayTestClass({arrayContainsAnyOf: [[]]}), {
            constraint: ARRAY_CONTAINS_ANY_OF,
            property: 'arrayContainsAnyOf',
            message: 'arrayContainsAnyOf must include at least one of $constraint1',
        })
    })

    it('eachArrayContainsAnyOf should fail validation', () => {
        expectValidationError(new ArrayTestClass({eachArrayContainsAnyOf: [[1], [0, 5, 10]]}), {
            constraint: ARRAY_CONTAINS_ANY_OF,
            property: 'eachArrayContainsAnyOf',
            message: 'each value in eachArrayContainsAnyOf must include at least one of $constraint1',
        })
    })
})
