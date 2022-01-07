import { isMap } from '../is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param items List of forbidden key values for this map.
 */
export function mapNotContainsKeys(value: unknown, items: Iterable<unknown>): value is Map<unknown, unknown> {
    return isMap(value) && [...items].every(item => !value.has(item))
}
