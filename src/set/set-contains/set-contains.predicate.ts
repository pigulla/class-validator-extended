import { isSet } from '../is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory values for this set.
 */
export function setContains(value: unknown, required: Iterable<unknown>): value is Set<unknown> {
    return isSet(value) && [...required].every(item => value.has(item))
}
