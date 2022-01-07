import 'jest-extended'

import { expectNoValidationErrors } from '../../util'

import { BigIntTestClass } from './bigint-test-class'

describe('An instance of BigIntTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new BigIntTestClass())
    })
})
