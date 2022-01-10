import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import type { ArrayMonotonicOptions } from './array-monotonic.options'
import { arrayMonotonic } from './array-monotonic.predicate'

/** @hidden */
export const ARRAY_MONOTONIC = 'arrayMonotonic'

/**
 * Checks if the given value is an array sorted in either (strictly) ascending or (strictly) descending order.
 *
 * This validator will always pass if the given value is an empty array.
 *
 * #### Example
 * ```typescript
 * // Ensure the array is sorted in reverse order of dates of birth.
 * @ArrayMonotonic({
 *     monotonicity: Monotonicity.WEAKLY_DECREASING,
 *     projection: (user: User) => user.dateOfBirth.getTime()
 * })
 * users: User[]
 * ```
 * ```typescript
 * // Ensure the array is sorted in ascending order, allowing no duplicates.
 * @ArrayMonotonic({
 *     monotonicity: Monotonicity.STRICTLY_INCREASING,
 *     comparator: (a, b) => a - b
 * })
 * values: number[]
 * ```
 *
 * @category Array
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `monotonicity: Monotonicity`
 *     The required ordering of the array.
 *   - `projection: (element) => number` (*mutually exclusive with `comparator`)
 *     Project an array element to a number which is then used for comparison.
 *   - `comparator: (a, b) => number` (*mutually exclusive with `projection`)
 *     Directly compare two elements (as in [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)).
 *
 */
export function ArrayMonotonic<T>(options: ArrayMonotonicOptions<T> & ValidationOptions) {
    return ValidateBy(
        {
            name: ARRAY_MONOTONIC,
            validator: {
                validate: (value, _arguments): boolean => arrayMonotonic(value, options),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a ${options.monotonicity} array`,
                    options
                ),
            },
        },
        options
    )
}
