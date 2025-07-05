import { isSet } from '../../type/is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param minimum The minimum size of the set that is allowed.
 */
export function setMinSize(value: unknown, minimum: number): value is Set<unknown> {
    if (typeof minimum !== 'number' || !Number.isFinite(minimum)) {
        throw new TypeError('Parameter "minimum" must be a finite number')
    }

    return isSet(value) && value.size >= minimum
}
