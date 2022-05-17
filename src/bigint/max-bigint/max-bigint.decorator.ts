import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { maxBigInt } from './max-bigint.predicate'

/** @hidden */
export const MAX_BIGINT = 'maxBigInt'

/**
 * Checks if the given value is a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
 * not greater than `maximum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is less than 9000.
 * @MaxBigInt(8_999)
 * underNineThousand: BigInt
 * ```
 *
 * @category BigInt
 * @param maximum The maximum allowed value.
 * @param options Generic class-validator options.
 */
export function MaxBigInt(maximum: number | bigint, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_BIGINT,
            constraints: [maximum],
            validator: {
                validate: (value, _arguments): boolean => maxBigInt(value, maximum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not be larger than $constraint1`,
                    options
                ),
            },
        },
        options
    )
}
