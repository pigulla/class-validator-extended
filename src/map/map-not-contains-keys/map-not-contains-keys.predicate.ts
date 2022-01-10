import { isMap } from '../is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param forbidden List of forbidden key values for this map.
 */
export function mapNotContainsKeys(value: unknown, forbidden: Iterable<unknown>): value is Map<unknown, unknown> {
    return isMap(value) && [...forbidden].every(item => !value.has(item))
}
