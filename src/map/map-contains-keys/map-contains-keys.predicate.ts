import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory keys for this set.
 */
export function mapContainsKeys(value: unknown, required: Iterable<unknown>): value is Map<unknown, unknown> {
    return isMap(value) && [...required].every(item => value.has(item))
}
