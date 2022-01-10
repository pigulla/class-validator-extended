import 'jest-extended'

import { expectNoValidationErrors } from '~test/util'

import { ArrayTestClass } from './array-test-class'

it('An instance of the ArrayTestClass should be valid', () => {
    expectNoValidationErrors(new ArrayTestClass())
})
