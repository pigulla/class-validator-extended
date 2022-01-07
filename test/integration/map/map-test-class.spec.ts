import 'jest-extended'

import { expectNoValidationErrors } from '../../util'

import { MapTestClass } from './map-test-class'

describe('An instance of MapTestClass', () => {
    it('should be valid', () => {
        expectNoValidationErrors(new MapTestClass())
    })
})
