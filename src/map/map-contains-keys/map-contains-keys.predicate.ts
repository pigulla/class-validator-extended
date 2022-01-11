import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory keys for this set.
 * @typeParam T The type of keys to check for.
 */
export function mapContainsKeys<T = unknown>(value: unknown, required: Iterable<T>): value is Map<unknown, unknown> {
    return isMap(value) && [...required].every(item => value.has(item))
}
