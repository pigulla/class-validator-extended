import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isBigInt } from './is-bigint.predicate'

/** @hidden */
export const IS_BIGINT = 'isBigInt'

/**
 * Checks if the given value is a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a BigInt.
 * @IsBigInt()
 * hugeNumber: BigInt
 * ```
 *
 * @category BigInt
 * @param options Generic class-validator options.
 */
export function IsBigInt(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => isBigInt(value),
                defaultMessage: buildMessage(eachPrefix => `${eachPrefix}$property must be a BigInt`, options),
            },
        },
        options
    )
}
