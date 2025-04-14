import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'

import { mapUnique } from './map-unique.predicate'

/** @hidden */
export const MAP_UNIQUE = 'mapUnique'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * without duplicates with regard to the given projection.
 *
 * #### Example
 * ```typescript
 * // Ensure the map does not include duplicate users.
 * @MapUnique<User>(user => user.id)
 * usersByEmail: Map<string, User>
 * ```
 *
 * @category Map
 * @param projection The function mapping each map entry to the value that is used for the uniqueness check.
 * @param options Generic class-validator options.
 * @typeParam Value The type of the map's values.
 * @typeParam Projection The type returned by `projection`.
 */
export function MapUnique<Value = unknown, Projection = Value>(
    projection: (item: Value) => Projection,
    options?: ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_UNIQUE,
            validator: {
                validate: (value, _arguments): boolean =>
                    mapUnique<Value, Projection>(value, projection),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must have unique values`,
                    options,
                ),
            },
        },
        options,
    )
}
