import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { mapSize } from './map-size.predicate'

/** @hidden */
export const MAP_SIZE = 'mapSize'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with a size of exactly `size`.
 *
 * #### Example
 * ```typescript
 * // Ensure the map has exactly 5 entries.
 * @MapSize(5)
 * values: Map<string, string>
 * ```
 *
 * @category Map
 * @param size The allowed size of the map.
 * @param options Generic class-validator options.
 */
export function MapSize(size: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_SIZE,
            constraints: [size],
            validator: {
                validate: (value, _arguments): boolean => mapSize(value, size),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain exactly $constraint1 element(s)`,
                    options
                ),
            },
        },
        options
    )
}
