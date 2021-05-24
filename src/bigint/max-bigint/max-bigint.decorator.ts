import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {maxBigInt} from './max-bigint.predicate'

export const MAX_BIGINT = 'maxBigInt'

export function MaxBigInt(maxValue: number | BigInt, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => maxBigInt(value, maxValue),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not be less than $constraint1`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
