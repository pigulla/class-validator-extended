import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param required List of keys that can be set for this set.
 * @typeParam Key The type of keys to check for.
 */
export function mapIncludesKeys<Key = unknown>(
    value: unknown,
    required: Iterable<Key>
): value is Map<unknown, unknown> {
    return isMap(value) && [...value.keys()].every(key => [...required].includes(key as Key))
}
