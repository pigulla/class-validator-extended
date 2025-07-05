import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isNull } from './is-null.predicate'

/** @hidden */
export const IS_NULL = 'isNull'

/**
 * Checks if the given value is `null`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is null (but not undefined).
 * @IsNull()
 * value: null
 * ```
 *
 * @category Type
 * @param options Generic class-validator options.
 */
export function IsNull(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_NULL,
            validator: {
                validate: (value, _arguments): boolean => isNull(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be null`,
                    options,
                ),
            },
        },
        options,
    )
}
