import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { negativeBigInt } from './negative-bigint.predicate'

/** @hidden */
export const NEGATIVE_BIGINT = 'negativeBigInt'

/**
 * Checks if the given value is a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
 * less than zero.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is less than 0.
 * @NegativeBigInt()
 * negativeNumber: BigInt
 * ```
 *
 * @category BigInt
 * @param options Generic class-validator options.
 */
export function NegativeBigInt(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: NEGATIVE_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => negativeBigInt(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a negative BigInt`,
                    options,
                ),
            },
        },
        options,
    )
}
