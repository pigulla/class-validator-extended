import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden key values for this map.
 * @typeParam Key The type of keys to check for.
 */
export function mapNotContainsKeys<Key = unknown>(
    value: unknown,
    forbidden: Iterable<Key>,
): value is Map<unknown, unknown> {
    return isMap(value) && [...forbidden].every(item => !value.has(item))
}
