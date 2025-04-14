import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'

import { setNotContains } from './set-not-contains.predicate'

/** @hidden */
export const SET_NOT_CONTAINS = 'setNotContains'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * which does not contain any of the forbidden values.
 *
 * #### Example
 * ```typescript
 * // Ensure the set does not contain the values 'foo' and 'bar'.
 * @SetNotContains(['foo', 'bar'])
 * values: Set<string>
 * ```
 *
 * @category Set
 * @param forbidden The values forbidden in the given set.
 * @param options Generic class-validator options.
 * @typeParam Value The type of values to check for.
 */
export function SetNotContains<Value = unknown>(
    forbidden: Iterable<Value>,
    options?: ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_NOT_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => setNotContains<Value>(value, forbidden),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must not contain any of the following values: ${[
                            ...forbidden,
                        ].join(', ')}`,
                    options,
                ),
            },
        },
        options,
    )
}
