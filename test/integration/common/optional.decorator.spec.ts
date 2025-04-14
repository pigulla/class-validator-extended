import { describe, it } from 'node:test'

import { IS_STRING, IsString } from 'class-validator'

import { Optional } from '../../../src'
import { expectNoValidationErrors, expectValidationError } from '../../util'

describe('@Optional', () => {
    it('should allow undefined', () => {
        class TestClass {
            @Optional()
            @IsString()
            property?: string
        }

        expectNoValidationErrors(new TestClass())
    })

    it('should disallow null', () => {
        class TestClass {
            @Optional()
            @IsString()
            property = null
        }

        expectValidationError(new TestClass(), {
            property: 'property',
            message: 'property must be a string',
            constraint: IS_STRING,
        })
    })

    it('should validate if not undefined', () => {
        class TestClass {
            @Optional()
            @IsString()
            property = 42
        }

        expectValidationError(new TestClass(), {
            property: 'property',
            message: 'property must be a string',
            constraint: IS_STRING,
        })
    })
})
