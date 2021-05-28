import {isBigInt} from '../is-bigint'

export function positiveBigInt(value: unknown): value is BigInt {
    return isBigInt(value) && value > BigInt(0)
}
