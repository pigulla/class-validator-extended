import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'

import { positiveBigInt } from './positive-bigint.predicate'

/** @hidden */
export const POSITIVE_BIGINT = 'positiveBigInt'

/**
 * Checks if the given value is a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
 * greater than zero.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is greater than 0.
 * @PositiveBigInt()
 * positiveNumber: BigInt
 * ```
 *
 * @category BigInt
 * @param options Generic class-validator options.
 */
export function PositiveBigInt(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: POSITIVE_BIGINT,
            validator: {
                validate: (value, _arguments): boolean => positiveBigInt(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a positive BigInt`,
                    options,
                ),
            },
        },
        options,
    )
}
