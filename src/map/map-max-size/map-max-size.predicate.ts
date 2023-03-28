import { isMap } from '../../type/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum size of the set that is allowed.
 */
export function mapMaxSize(value: unknown, maximum: number): value is Map<unknown, unknown> {
    if (typeof maximum !== 'number' || !Number.isFinite(maximum)) {
        throw new TypeError('Parameter "maximum" must be a finite number')
    }

    return isMap(value) && value.size <= maximum
}
