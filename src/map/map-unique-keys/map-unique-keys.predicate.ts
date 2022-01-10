import { isMap } from '../is-map'

import type { MapUniqueKeysProjection } from './map-unique-keys.options'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param projection The function mapping each key to the value that is used for the uniqueness check.
 */
export function mapUniqueKeys<Key, Projection>(
    value: unknown,
    projection: MapUniqueKeysProjection<Key, Projection>
): value is Map<Key, unknown> {
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
