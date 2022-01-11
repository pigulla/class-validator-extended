import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of mandatory values for this map.
 * @typeParam Value The type of values to check for.
 */
export function mapContains<Value = unknown>(
    value: unknown,
    required: Iterable<Value>
): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...required].every(item => values.has(item))
}
