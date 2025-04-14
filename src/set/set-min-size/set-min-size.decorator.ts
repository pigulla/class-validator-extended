import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'

import { setMinSize } from './set-min-size.predicate'

/** @hidden */
export const SET_MIN_SIZE = 'setMinSize'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * with a size greater than or equal to `minimum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the set has at least 5 entries.
 * @SetMinSize(5)
 * values: Set<string>
 * ```
 *
 * @category Set
 * @param minimum The minimum allowed size of the set.
 * @param options Generic class-validator options.
 */
export function SetMinSize(minimum: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_MIN_SIZE,
            constraints: [minimum],
            validator: {
                validate: (value, _arguments): boolean => setMinSize(value, minimum),
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
