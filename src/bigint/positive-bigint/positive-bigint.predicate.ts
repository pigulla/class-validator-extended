import { isBigInt } from '../../type/is-bigint'

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function positiveBigInt(value: unknown): value is bigint {
    return isBigInt(value) && value > BigInt(0)
}
