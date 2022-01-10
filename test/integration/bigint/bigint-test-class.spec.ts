import 'jest-extended'

import { expectNoValidationErrors } from '~test/util'

import { BigIntTestClass } from './bigint-test-class'

describe('An instance of BigIntTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new BigIntTestClass())
    })
})
