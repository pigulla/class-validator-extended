import { isMap } from '../is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param items List of forbidden values for this map.
 */
export function mapNotContains(value: unknown, items: Iterable<unknown>): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...items].every(item => !values.has(item))
}
