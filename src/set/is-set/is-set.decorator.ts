import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { isSet } from './is-set.predicate'

/** @hidden */
export const IS_SET = 'isSet'

/**
 * @category Set
 */
export function IsSet(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_SET,
            validator: {
                validate: (value, _arguments): boolean => isSet(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Set instance`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
