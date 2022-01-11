import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden key values for this map.
 * @typeParam T The type of keys to check for.
 */
export function mapNotContainsKeys<T = unknown>(
    value: unknown,
    forbidden: Iterable<T>
): value is Map<unknown, unknown> {
    return isMap(value) && [...forbidden].every(item => !value.has(item))
}
