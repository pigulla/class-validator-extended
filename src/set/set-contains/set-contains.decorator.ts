import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { setContains } from './set-contains.predicate'

/** @hidden */
export const SET_CONTAINS = 'setContains'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * and contains all required items.
 *
 * #### Example
 * ```typescript
 * // Ensure the set contains (at least) 'foo' and 'bar'.
 * @SetContains(['foo', 'bar'])
 * values: Set<string>
 * ```
 *
 * @category Set
 * @param required The values required in the given set.
 * @param options Generic class-validator options.
 * @typeParam T The type of values to check for.
 */
export function SetContains<T = unknown>(required: Iterable<T>, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => setContains(value, required),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 values`,
                    options
                ),
            },
        },
        options
    )
}
