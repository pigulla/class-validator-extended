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
 * @ArrayMonotonic<User>({
 *     monotonicity: Monotonicity.WEAKLY_DECREASING,
 *     projection: user => user.dateOfBirth.getTime()
 * })
 * users: User[]
 * ```
 * ```typescript
 * // Ensure the array is sorted in ascending order, allowing duplicates.
 * @ArrayMonotonic({
 *     monotonicity: Monotonicity.WEAKLY_INCREASING
 * })
 * numbers: number[]
 *
 * // Ensure the array is sorted by user id in descending order, allowing no duplicates.
 * @ArrayMonotonic<User>({
 *     monotonicity: Monotonicity.STRICTLY_DECREASING,
 *     projection: user => user.id
 * })
 * users: User[]
 *
 * // Same as above, but using a comparator.
 * @ArrayMonotonic<User>({
 *     monotonicity: Monotonicity.STRICTLY_DECREASING,
 *     comparator: (a, b) => b.id - a.id
 * })
 * users: User[]
 * ```
 *
 * @category Array
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `monotonicity: Monotonicity`
 *     The required ordering of the array.
 *   - `projection?: (element) => number` (*mutually exclusive with `comparator`*)
 *     Project an array element to a number which is then used for comparison.
 *   - `comparator?: (a, b) => number` (*mutually exclusive with `projection`*)
 *     Directly compare two elements (as in [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)).
 *
 * If neither `projection` nor `comparator` is given, the values are compared ordinally.
 * @typeParam T The type of the array elements.
 */
export function ArrayMonotonic<T = unknown>(options: ArrayMonotonicOptions<T> & ValidationOptions) {
    return ValidateBy(
        {
            name: ARRAY_MONOTONIC,
            constraints: [options.monotonicity],
            validator: {
                validate: (value, _arguments): boolean =>
                    arrayMonotonic<T>(value, { monotonicity: options.monotonicity }),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a $constraint1 array`,
                    options
                ),
            },
        },
        options
    )
}
