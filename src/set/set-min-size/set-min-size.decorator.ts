import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { setMinSize } from './set-min-size.predicate'

/** @hidden */
export const SET_MIN_SIZE = 'setMinSize'

/**
 * @category Set
 */
export function SetMinSize(minimum: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_MIN_SIZE,
            validator: {
                validate: (value, _arguments): boolean => setMinSize(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain at least $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
