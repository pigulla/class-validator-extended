import { isSet } from '../../type/is-set'
/**
 * @category Predicates
 * @param value The value to validate.
 */
export function setNotEmpty(value: unknown): value is Set<unknown> {
    return isSet(value) && value.size > 0
}
