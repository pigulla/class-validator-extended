import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory keys for this set.
 * @typeParam Key The type of keys to check for.
 */
export function mapContainsKeys<Key = unknown>(
    value: unknown,
    required: Iterable<Key>
): value is Map<unknown, unknown> {
    return isMap(value) && [...required].every(item => value.has(item))
}
