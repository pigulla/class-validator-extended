import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { setNotEmpty } from './set-not-empty.predicate'

/** @hidden */
export const SET_NOT_EMPTY = 'setNotEmpty'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * with at least one value.
 *
 * #### Example
 * ```typescript
 * // Ensure the set is not empty.
 * @SetNotEmpty()
 * values: Set<string>
 * ```
 *
 * @category Set
 * @param options Generic class-validator options.
 */
export function SetNotEmpty(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_NOT_EMPTY,
            validator: {
                validate: (value, _arguments): boolean => setNotEmpty(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not be an empty set`,
                    options,
                ),
            },
        },
        options,
    )
}
