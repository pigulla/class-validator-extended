import 'jest-extended'

import { expectNoValidationErrors } from '~test/util'

import { DateTestClass } from './date-test-class'

describe('An instance of DateTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new DateTestClass())
    })
})
