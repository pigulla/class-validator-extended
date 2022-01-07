import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { setMaxSize } from './set-max-size.predicate'

/** @hidden */
export const SET_MAX_SIZE = 'setMaxSize'

/**
 * @category Set
 */
export function SetMaxSize(maximum: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_MAX_SIZE,
            validator: {
                validate: (value, _arguments): boolean => setMaxSize(value, maximum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
