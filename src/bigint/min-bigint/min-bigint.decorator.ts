import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { minBigInt } from './min-bigint.predicate'

/** @hidden */
export const MIN_BIGINT = 'minBigInt'

/**
 * Checks if the given value is a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
 * not less than `minimum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is greater than 9000.
 * @MinBigInt(9_001)
 * overNineThousand: BigInt
 * ```
 *
 * @category BigInt
 * @param minimum The minimum allowed value.
 * @param options Generic class-validator options.
 */
export function MinBigInt(
    minimum: number | bigint,
    options?: ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_BIGINT,
            constraints: [minimum],
            validator: {
                validate: (value, _arguments): boolean => minBigInt(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not be less than $constraint1`,
                    options,
                ),
            },
        },
        options,
    )
}
