import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapNotContainsKeys } from './map-not-contains-keys.predicate'

/** @hidden */
export const MAP_NOT_CONTAINS_KEYS = 'mapNotContainsKeys'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * which does not contain any of the forbidden keys.
 *
 * #### Example
 * ```typescript
 * // Ensure the map contains does not include the keys 13 and 42.
 * @MapNotContainsKeys(13, 42)
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param forbidden The values forbidden in the given map.
 * @param options Generic class-validator options.
 * @typeParam T The type of keys to check for.
 */
export function MapNotContainsKeys<T = unknown>(
    forbidden: Iterable<T>,
    options?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_CONTAINS_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapNotContainsKeys(value, forbidden),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not contain $constraint1 keys`,
                    options
                ),
            },
        },
        options
    )
}
