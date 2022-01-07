import { isBigInt } from '../is-bigint'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum allowed value.
 */
export function maxBigInt(value: unknown, maximum: number | BigInt): value is BigInt {
    if (!(typeof maximum === 'bigint' || (typeof maximum === 'number' && Number.isFinite(maximum)))) {
        throw new TypeError('Parameter "maximum" must be a finite number')
    }

    return isBigInt(value) && value <= BigInt(maximum)
}
