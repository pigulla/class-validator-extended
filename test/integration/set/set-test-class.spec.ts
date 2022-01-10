import 'jest-extended'

import { expectNoValidationErrors } from '~test/util'

import { SetTestClass } from './set-test-class'

describe('An instance of SetTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new SetTestClass())
    })
})
