import 'jest-extended'

import { expectNoValidationErrors } from '~test/util'

import { StringTestClass } from './string-test-class'

describe('An instance of StringTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new StringTestClass())
    })
})
