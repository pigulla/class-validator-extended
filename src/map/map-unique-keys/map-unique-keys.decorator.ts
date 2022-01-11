import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import type { MapUniqueKeysProjection } from './map-unique-keys.options'
import { mapUniqueKeys } from './map-unique-keys.predicate'

/** @hidden */
export const MAP_UNIQUE_KEYS = 'mapUniqueKeys'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * whose keys are all unique with regard to the given projection.
 *
 * #### Example
 * ```typescript
 * // Ensure there are no duplicate user ids in the map.
 * @MapUniqueKeys<User>(user => user.id)
 * postsByUser: Map<User, Post[]>
 * ```
 *
 * @category Map
 * @param projection The function mapping each key to the value that is used for the uniqueness check.
 * @param options Generic class-validator options.
 * @typeParam Key The type of the map's keys.
 * @typeParam Projection The type returned by `projection`.
 */
export function MapUniqueKeys<Key = unknown, Projection = unknown>(
    projection: MapUniqueKeysProjection<Key, Projection>,
    options?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_UNIQUE_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapUniqueKeys<Key, Projection>(value, projection),
                defaultMessage: buildMessage(eachPrefix => `${eachPrefix}all $property's keys must be unique`, options),
            },
        },
        options
    )
}
