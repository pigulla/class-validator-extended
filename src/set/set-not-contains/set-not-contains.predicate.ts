import { isSet } from '../../type/is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden values for this set.
 * @typeParam Value The type of values to check for.
 */
export function setNotContains<Value = unknown>(value: unknown, forbidden: Iterable<Value>): value is Set<unknown> {
    return isSet(value) && [...forbidden].every(item => !value.has(item))
}
