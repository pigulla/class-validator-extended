import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {positiveBigInt} from './positive-bigint.predicate'

export const POSITIVE_BIGINT = 'positiveBigInt'

export function PositiveBigInt(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: POSITIVE_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => positiveBigInt(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a positive BigInt`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
