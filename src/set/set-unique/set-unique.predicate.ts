import { isSet } from '../../set/is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param projection The function mapping each value to the value that is used for the uniqueness check.
 * @typeParam Value The type of the set's values.
 * @typeParam Projection The type returned by `projection`.
 */
export function setUnique<Value, Projection>(
    value: unknown,
    projection: (item: Value) => Projection
): value is Set<Value> {
    if (typeof projection !== 'function') {
        throw new TypeError('Parameter "projection" must be a function')
    }

    if (!isSet(value)) {
        return false
    }

    const seen = new Set<Projection>()
    const set = value as Set<Value>

    for (const item of set.keys()) {
        const selected = projection(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
