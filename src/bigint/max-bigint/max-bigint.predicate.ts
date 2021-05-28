import {isBigInt} from '../is-bigint'

export function maxBigInt(value: unknown, maxValue: number | BigInt): value is BigInt {
    if (!(typeof maxValue === 'bigint' || (typeof maxValue === 'number' && Number.isFinite(maxValue)))) {
        throw new TypeError('Parameter "maxValue" must be a finite number')
    }

    return isBigInt(value) && value <= BigInt(maxValue)
}
