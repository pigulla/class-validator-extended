import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {isBigInt} from './is-bigint.predicate'

export const IS_BIGINT = 'isBigInt'

export function IsBigInt(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => isBigInt(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a BigInt`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
