import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory values for this map.
 */
export function mapContains<T = unknown>(value: unknown, required: Iterable<T>): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...required].every(item => values.has(item))
}
