import { isBigInt } from '../../bigint/is-bigint'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param minimum The minimum allowed value.
 */
export function minBigInt(value: unknown, minimum: number | bigint): value is bigint {
    if (!(typeof minimum === 'bigint' || (typeof minimum === 'number' && Number.isFinite(minimum)))) {
        throw new TypeError('Parameter "minimum" must be a finite number')
    }

    return isBigInt(value) && value >= BigInt(minimum)
}
