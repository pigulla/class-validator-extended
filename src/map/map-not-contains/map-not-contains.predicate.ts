import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden values for this map.
 * @typeParam T The type of values to check for.
 */
export function mapNotContains<T>(value: unknown, forbidden: Iterable<T>): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...forbidden].every(item => !values.has(item))
}
