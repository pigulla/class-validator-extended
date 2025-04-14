import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'

import { mapNotContainsKeys } from './map-not-contains-keys.predicate'

/** @hidden */
export const MAP_NOT_CONTAINS_KEYS = 'mapNotContainsKeys'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * which does not contain any of the forbidden keys.
 *
 * #### Example
 * ```typescript
 * // Ensure the map does not contain the keys 13 and 42.
 * @MapNotContainsKeys([13, 42])
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param forbidden The values forbidden in the given map.
 * @param options Generic class-validator options.
 * @typeParam Key The type of keys to check for.
 */
export function MapNotContainsKeys<Key = unknown>(
    forbidden: Iterable<Key>,
    options?: ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_CONTAINS_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapNotContainsKeys<Key>(value, forbidden),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must not contain any of the following keys: ${[
                            ...forbidden,
                        ].join(', ')}`,
                    options,
                ),
            },
        },
        options,
    )
}
