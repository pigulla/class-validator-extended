import { it } from 'node:test'

import { expectNoValidationErrors } from '../../util'

import { ArrayTestClass } from './array-test-class'

it('An instance of the ArrayTestClass should be valid', () => {
    expectNoValidationErrors(new ArrayTestClass())
})
