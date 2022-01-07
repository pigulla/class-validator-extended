import { isBigInt } from '../is-bigint'

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function positiveBigInt(value: unknown): value is BigInt {
    return isBigInt(value) && value > BigInt(0)
}
