import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'

import { setUnique } from './set-unique.predicate'

/** @hidden */
export const SET_UNIQUE = 'setUnique'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * without duplicate values with regard to the given projection.
 *
 * #### Example
 * ```typescript
 * // Ensure the set does not include duplicate users.
 * @SetUnique<User>(user => user.id)
 * administrators: Set<User>
 * ```
 *
 * @category Set
 * @param projection The function mapping each value to the value that is used for the uniqueness check.
 * @param options Generic class-validator options.
 * @typeParam Value The type of the set's values.
 * @typeParam Projection The type returned by `projection`.
 */
export function SetUnique<Value = unknown, Projection = unknown>(
    projection: (item: Value) => Projection,
    options?: ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_UNIQUE,
            validator: {
                validate: (value, _arguments): boolean => setUnique(value, projection),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must have unique values`,
                    options,
                ),
            },
        },
        options,
    )
}
