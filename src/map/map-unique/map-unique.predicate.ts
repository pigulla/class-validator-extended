import { isMap } from '../../map/is-map'

import type { MapUniqueProjection } from './map-unique.options'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param projection The function mapping each value to the value that is used for the uniqueness check.
 */
export function mapUnique<Key, Projection>(
    value: unknown,
    projection: MapUniqueProjection<Key, Projection>
): value is Map<unknown, unknown> {
    if (typeof projection !== 'function') {
        throw new TypeError('Parameter "projection" must be a function')
    }

    if (!isMap(value)) {
        return false
    }

    const seen = new Set<Projection>()
    const map = value as Map<unknown, Key>

    for (const item of map.values()) {
        const selected = projection(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
