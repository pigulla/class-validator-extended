import 'jest-extended'

import { expectNoValidationErrors } from '../../util'

import { DayjsTestClass } from './dayjs-test-class'

describe('An instance of DayjsTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new DayjsTestClass())
    })
})
