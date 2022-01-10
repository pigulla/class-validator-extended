import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden values for this map.
 */
export function mapNotContains(value: unknown, forbidden: Iterable<unknown>): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...forbidden].every(item => !values.has(item))
}
