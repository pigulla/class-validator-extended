import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapContains } from './map-contains.predicate'

/** @hidden */
export const MAP_CONTAINS = 'mapContains'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * and contains all required values.
 *
 * #### Example
 * ```typescript
 * // Ensure the map contains (at least) 'foo' and 'bar'.
 * @MapContains(['foo', 'bar'])
 * values: Map<number, string>
 * ```
 *
 * @category Map
 * @param required The values required in the given map.
 * @param options Generic class-validator options.
 * @typeParam Value The type of values to check for.
 */
export function MapContains<Value = unknown>(
    required: Iterable<Value>,
    options?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => mapContains<Value>(value, required),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 values`,
                    options
                ),
            },
        },
        options
    )
}
