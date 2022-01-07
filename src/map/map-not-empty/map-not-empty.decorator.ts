import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapNotEmpty } from './map-not-empty.predicate'

/** @hidden */
export const MAP_NOT_EMPTY = 'mapNotEmpty'

/**
 * @category Map
 */
export function MapNotEmpty(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_EMPTY,
            validator: {
                validate: (value, _arguments): boolean => mapNotEmpty(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not be an empty map`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
