import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {minBigInt} from './min-bigint.predicate'

export const MIN_BIGINT = 'minBigInt'

export function MinBigInt(minValue: number | BigInt, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => minBigInt(value, minValue),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not be less than $constraint1`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
