import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapNotContains } from './map-not-contains.predicate'

/** @hidden */
export const MAP_NOT_CONTAINS = 'mapNotContains'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * which does not contain any of the forbidden values.
 *
 * #### Example
 * ```typescript
 * // Ensure the map contains does not include the values 'foo' and 'bar'.
 * @MapNotContains(['foo', 'bar'])
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param forbidden The values forbidden in the given map.
 * @param options Generic class-validator options.
 * @typeParam T The type of values to check for.
 */
export function MapNotContains<T = unknown>(forbidden: Iterable<T>, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => mapNotContains(value, forbidden),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not contain $constraint1 values`,
                    options
                ),
            },
        },
        options
    )
}
