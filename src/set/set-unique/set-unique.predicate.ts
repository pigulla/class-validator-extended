import { isSet } from '../is-set'

import { SetUniqueProjection } from './set-unique.options'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param projection The function mapping each value to the value that is used for the uniqueness check.
 */
export function setUnique<T, P>(value: unknown, projection: SetUniqueProjection<T, P>): value is Set<T> {
    if (typeof projection !== 'function') {
        throw new TypeError('Parameter "projection" must be a function')
    }

    if (!isSet(value)) {
        return false
    }

    const seen = new Set<P>()
    const set = value as Set<T>

    for (const item of set.keys()) {
        const selected = projection(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
