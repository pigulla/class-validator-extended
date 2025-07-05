import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapNotEmpty } from './map-not-empty.predicate'

/** @hidden */
export const MAP_NOT_EMPTY = 'mapNotEmpty'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with at least one entry.
 *
 * #### Example
 * ```typescript
 * // Ensure the map is not empty.
 * @MapNotEmpty()
 * values: Map
 * ```
 *
 * @category Map
 * @param options Generic class-validator options.
 */
export function MapNotEmpty(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_EMPTY,
            validator: {
                validate: (value, _arguments): boolean => mapNotEmpty(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not be an empty map`,
                    options,
                ),
            },
        },
        options,
    )
}
