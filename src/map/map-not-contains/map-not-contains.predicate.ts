import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden values for this map.
 * @typeParam Value The type of values to check for.
 */
export function mapNotContains<Value = unknown>(
    value: unknown,
    forbidden: Iterable<Value>
): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...forbidden].every(item => !values.has(item))
}
