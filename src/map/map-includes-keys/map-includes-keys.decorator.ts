import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapIncludesKeys } from './map-includes-keys.predicate'

/** @hidden */
export const MAP_INCLUDES_KEYS = 'mapIncludesKeys'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * and use only the keys given.
 *
 * #### Example
 * ```typescript
 * // Ensure that the map includes the keys 13 and 42. Other key is disallowed.
 * @MapIncludesKeys([13, 42])
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param includes The keys that must be used for the given map.
 * @param options Generic class-validator options.
 * @typeParam Key The type of keys to check for.
 */
export function MapIncludesKeys<Key = unknown>(includes: Key[], options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_INCLUDES_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapIncludesKeys<Key>(value, includes),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must include only the following keys: ${[...includes].join(', ')}`,
                    options
                ),
            },
        },
        options
    )
}
