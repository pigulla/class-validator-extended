import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { MapUniqueKeyProjection } from './map-unique-key.options'
import { mapUniqueKey } from './map-unique-key.predicate'

/** @hidden */
export const MAP_UNIQUE_KEY = 'mapUniqueKey'

/**
 * Checks if the value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * whose keys are all unique with regard to the given projection.
 *
 * #### Example
 * ```typescript
 * // Ensure there are no duplicate user ids in the map.
 * @MapUniqueKey<User>(user => user.id)
 * postsByUser: Map<User, Post[]>
 * ```
 *
 * @category Map
 * @param projection The function mapping each key to the value that is used for the uniqueness check.
 * @param validationOptions Additional options.
 * @typeParam Key The type of the map's keys.
 * @typeParam Projection The type returned by the `projection`.
 */
export function MapUniqueKey<Key = unknown, Projection = unknown>(
    projection: MapUniqueKeyProjection<Key, Projection>,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_UNIQUE_KEY,
            validator: {
                validate: (value, _arguments): boolean => mapUniqueKey(value, projection),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}all $property's keys must be unique`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
