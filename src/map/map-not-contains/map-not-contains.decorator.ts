import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapNotContains } from './map-not-contains.predicate'

/** @hidden */
export const MAP_NOT_CONTAINS = 'mapNotContains'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * which does not contain any of the forbidden values.
 *
 * #### Example
 * ```typescript
 * // Ensure the map does not contain the values 'foo' and 'bar'.
 * @MapNotContains(['foo', 'bar'])
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param forbidden The values forbidden in the given map.
 * @param options Generic class-validator options.
 * @typeParam Value The type of values to check for.
 */
export function MapNotContains<Value = unknown>(
    forbidden: Iterable<Value>,
    options?: ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => mapNotContains<Value>(value, forbidden),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must not contain any of the following values: ${[
                            ...forbidden,
                        ].join(', ')}`,
                    options,
                ),
            },
        },
        options,
    )
}
