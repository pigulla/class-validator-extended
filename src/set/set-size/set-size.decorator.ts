import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { setSize } from './set-size.predicate'

/** @hidden */
export const SET_SIZE = 'setSize'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * with a size of exactly `size`.
 *
 * #### Example
 * ```typescript
 * // Ensure the set has exactly 5 entries.
 * @SetSize(5)
 * values: Set<string>
 * ```
 *
 * @category Set
 * @param size The allowed size of the set.
 * @param options Generic class-validator options.
 */
export function SetSize(size: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_SIZE,
            constraints: [size],
            validator: {
                validate: (value, _arguments): boolean => setSize(value, size),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must contain exactly $constraint1 element(s)`,
                    options,
                ),
            },
        },
        options,
    )
}
