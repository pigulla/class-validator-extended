import { isSet } from '../is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param items List of mandatory values for this set.
 */
export function setContains(value: unknown, items: Iterable<unknown>): value is Set<unknown> {
    return isSet(value) && [...items].every(item => value.has(item))
}
