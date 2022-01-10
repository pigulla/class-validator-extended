import { isSet } from '../../set/is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden values for this set.
 */
export function setNotContains(value: unknown, forbidden: Iterable<unknown>): value is Set<unknown> {
    return isSet(value) && [...forbidden].every(item => !value.has(item))
}
