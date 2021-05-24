import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {negativeBigInt} from './negative-bigint.predicate'

export const NEGATIVE_BIGINT = 'negativeBigInt'

export function NegativeBigInt(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: NEGATIVE_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => negativeBigInt(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a negative BigInt`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
