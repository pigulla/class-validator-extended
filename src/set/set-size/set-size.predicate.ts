import { isSet } from '../../set/is-set'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param size The size of the set that is allowed.
 */
export function setSize(value: unknown, size: number): value is Set<unknown> {
    if (typeof size !== 'number' || !Number.isFinite(size)) {
        throw new TypeError('Parameter "size" must be a finite number')
    }

    return isSet(value) && value.size <= size
}
