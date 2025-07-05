import { isSet } from '../../type/is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory values for this set.
 * @typeParam Value The type of values to check for.
 */
export function setContains<Value>(
    value: unknown,
    required: Iterable<Value>,
): value is Set<unknown> {
    return isSet(value) && [...required].every(item => value.has(item))
}
