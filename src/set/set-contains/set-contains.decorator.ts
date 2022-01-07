import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { setContains } from './set-contains.predicate'

/** @hidden */
export const SET_CONTAINS = 'setContains'

/**
 * @category Set
 */
export function SetContains(items: unknown[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => setContains(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 values`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
