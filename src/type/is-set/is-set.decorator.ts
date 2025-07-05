import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isSet } from './is-set.predicate'

/** @hidden */
export const IS_SET = 'isSet'

/**
 * Checks if the given value is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).
 *
 * This is a convenience decorator for `@IsInstance(Set)`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a Set.
 * @IsSet()
 * values: Set<string>
 * ```
 *
 * @category Type
 * @param options Generic class-validator options.
 */
export function IsSet(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_SET,
            validator: {
                validate: (value, _arguments): boolean => isSet(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be an instance of Set`,
                    options,
                ),
            },
        },
        options,
    )
}
