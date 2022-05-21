import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapMaxSize } from './map-max-size.predicate'

/** @hidden */
export const MAP_MAX_SIZE = 'mapMaxSize'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with a size less than or equal to `maximum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the map has at most 5 entries.
 * @MapMaxSize(5)
 * values: Map<string, string>
 * ```
 *
 * @category Map
 * @param maximum The maximum allowed size of the map.
 * @param options Generic class-validator options.
 */
export function MapMaxSize(maximum: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_MAX_SIZE,
            constraints: [maximum],
            validator: {
                validate: (value, _arguments): boolean => mapMaxSize(value, maximum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    options
                ),
            },
        },
        options
    )
}
