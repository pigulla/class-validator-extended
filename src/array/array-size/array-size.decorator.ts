import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { arraySize } from './array-size.predicate'

/** @hidden */
export const ARRAY_SIZE = 'arraySize'

/**
 * Checks if the given value is an array with a size of exactly `size`.
 *
 * #### Example
 * ```typescript
 * // Ensure the array has exactly 5 entries.
 * @ArraySize(5)
 * values: string[]
 * ```
 *
 * @category Array
 * @param size The allowed size of the array.
 * @param options Generic class-validator options.
 */
export function ArraySize(size: number, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: ARRAY_SIZE,
            constraints: [size],
            validator: {
                validate: (value, _arguments): boolean => arraySize(value, size),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain exactly $constraint1 element(s)`,
                    options
                ),
            },
        },
        options
    )
}
