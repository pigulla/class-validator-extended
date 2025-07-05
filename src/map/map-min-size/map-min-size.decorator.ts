import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapMinSize } from './map-min-size.predicate'

/** @hidden */
export const MAP_MIN_SIZE = 'mapMinSize'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with a size greater than or equal to `minimum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the map has at least 5 entries.
 * @MapMinSize(5)
 * values: Map<string, string>
 * ```
 *
 * @category Map
 * @param minimum The minimum allowed size of the map.
 * @param options Generic class-validator options.
 */
export function MapMinSize(minimum: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_MIN_SIZE,
            constraints: [minimum],
            validator: {
                validate: (value, _arguments): boolean => mapMinSize(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must contain at least $constraint1 elements`,
                    options,
                ),
            },
        },
        options,
    )
}
