import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param projection The function mapping each key to the value that is used for the uniqueness check.
 * @typeParam Key The type of the map's keys.
 * @typeParam Projection The type returned by `projection`.
 */
export function mapUniqueKeys<Key, Projection>(
    value: unknown,
    projection: (item: Key) => Projection,
): value is Map<unknown, unknown> {
    if (typeof projection !== 'function') {
        throw new TypeError('Parameter "projection" must be a function')
    }

    if (!isMap(value)) {
        return false
    }

    const seen = new Set<Projection>()
    const map = value as Map<Key, unknown>

    for (const item of map.keys()) {
        const selected = projection(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
