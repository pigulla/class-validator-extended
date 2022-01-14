import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapContainsKeys } from './map-contains-keys.predicate'

/** @hidden */
export const MAP_CONTAINS_KEYS = 'mapContainsKeys'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * and contains all required keys.
 *
 * #### Example
 * ```typescript
 * // Ensure the map contains (at least) the keys 13 and 42.
 * @MapContainsKeys([13, 42])
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param required The keys required in the given map.
 * @param options Generic class-validator options.
 * @typeParam Key The type of keys to check for.
 */
export function MapContainsKeys<Key = unknown>(required: Key[], options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_CONTAINS_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapContainsKeys<Key>(value, required),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 keys`,
                    options
                ),
            },
        },
        options
    )
}
