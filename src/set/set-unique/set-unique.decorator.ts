import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { SetUniqueProjection } from './set-unique.options'
import { setUnique } from './set-unique.predicate'

/** @hidden */
export const SET_UNIQUE = 'setUnique'

/**
 * @category Set
 */
export function SetUnique<T = unknown, P = unknown>(
    projection: SetUniqueProjection<T, P>,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_UNIQUE,
            validator: {
                validate: (value, _arguments): boolean => setUnique(value, projection),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}all $property's values must be unique`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
