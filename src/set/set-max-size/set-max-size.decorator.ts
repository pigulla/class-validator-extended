import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { setMaxSize } from './set-max-size.predicate'

/** @hidden */
export const SET_MAX_SIZE = 'setMaxSize'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * with a size less than or equal to `maximum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the set has at most 5 entries.
 * @SetMaxSize(5)
 * values: Set<string>
 * ```
 *
 * @category Set
 * @param maximum The maximum allowed size of the set.
 * @param options Generic class-validator options.
 */
export function SetMaxSize(maximum: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_MAX_SIZE,
            constraints: [maximum],
            validator: {
                validate: (value, _arguments): boolean => setMaxSize(value, maximum),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    options,
                ),
            },
        },
        options,
    )
}
