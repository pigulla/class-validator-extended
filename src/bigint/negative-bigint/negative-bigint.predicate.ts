import { isBigInt } from '../../type/is-bigint'

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function negativeBigInt(value: unknown): value is BigInt {
    return isBigInt(value) && value < BigInt(0)
}
