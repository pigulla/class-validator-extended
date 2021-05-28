import {isBigInt} from '../is-bigint'

export function minBigInt(value: unknown, minValue: number | BigInt): value is BigInt {
    if (!(typeof minValue === 'bigint' || (typeof minValue === 'number' && Number.isFinite(minValue)))) {
        throw new TypeError('Parameter "minValue" must be a finite number')
    }

    return isBigInt(value) && value >= BigInt(minValue)
}
