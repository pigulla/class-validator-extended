import { isSet } from '../../set/is-set'
/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory values for this set.
 * @typeParam T The type of values to check for.
 */
export function setContains<T>(value: unknown, required: Iterable<T>): value is Set<unknown> {
    return isSet(value) && [...required].every(item => value.has(item))
}
