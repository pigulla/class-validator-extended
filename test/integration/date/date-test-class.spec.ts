import 'jest-extended'

import { expectNoValidationErrors } from '../../util'

import { DateTestClass } from './date-test-class'

describe('An instance of DateTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new DateTestClass())
    })
})
