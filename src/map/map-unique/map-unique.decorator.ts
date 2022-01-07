import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { MapUniqueProjection } from './map-unique.options'
import { mapUnique } from './map-unique.predicate'

/** @hidden */
export const MAP_UNIQUE = 'mapUnique'

/**
 * @category Map
 */
export function MapUnique<Key = unknown, Projection = Key>(
    projection: MapUniqueProjection<Key, Projection>,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_UNIQUE,
            validator: {
                validate: (value, _arguments): boolean => mapUnique(value, projection),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}all $property's values must be unique`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
