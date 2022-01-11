import { isSet } from '../../set/is-set'
/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum size of the set that is allowed.
 */
export function setMaxSize(value: unknown, maximum: number): value is Set<unknown> {
    if (typeof maximum !== 'number' || !Number.isFinite(maximum)) {
        throw new TypeError('Parameter "maximum" must be a finite number')
    }

    return isSet(value) && value.size <= maximum
}
