import 'jest-extended'

import { IsString, IS_STRING } from 'class-validator'

import { Nullable } from '~'
import { expectNoValidationErrors, expectValidationError } from '~test/util'

describe('@Nullable', () => {
    it('should allow null', () => {
        class TestClass {
            @Nullable()
            @IsString()
            property = null
        }

        expectNoValidationErrors(new TestClass())
    })

    it('should disallow undefined', () => {
        class TestClass {
            @Nullable()
            @IsString()
            property = undefined
        }

        expectValidationError(new TestClass(), {
            property: 'property',
            message: 'property must be a string',
            constraint: IS_STRING,
        })
    })

    it('should validate if not null', () => {
        class TestClass {
            @Nullable()
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
