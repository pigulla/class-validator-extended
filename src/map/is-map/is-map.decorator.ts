import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isMap } from './is-map.predicate'

/** @hidden */
export const IS_MAP = 'isMap'

/**
 * Checks if the given value is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
 *
 * This is a convenience decorator for `@IsInstance(Map)`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a Map.
 * @IsMap()
 * values: Map
 * ```
 *
 * @category Map
 */
export function IsMap(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_MAP,
            validator: {
                validate: (value, _arguments): boolean => isMap(value),
                defaultMessage: buildMessage(eachPrefix => `${eachPrefix}$property must be a Map instance`, options),
            },
        },
        options
    )
}
