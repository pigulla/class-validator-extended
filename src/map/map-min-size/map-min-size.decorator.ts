import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapMinSize } from './map-min-size.predicate'

/** @hidden */
export const MAP_MIN_SIZE = 'mapMinSize'

/**
 * @category Map
 */
export function MapMinSize(minimum: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_MIN_SIZE,
            validator: {
                validate: (value, _arguments): boolean => mapMinSize(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain at least $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
