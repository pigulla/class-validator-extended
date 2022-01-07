import { isMap } from '../is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param items List of mandatory keys for this set.
 */
export function mapContainsKeys(value: unknown, items: Iterable<unknown>): value is Map<unknown, unknown> {
    return isMap(value) && [...items].every(item => value.has(item))
}
