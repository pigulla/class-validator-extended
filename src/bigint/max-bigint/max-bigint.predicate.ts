export function maxBigInt(value: unknown, maxValue: number | BigInt): value is BigInt {
    return typeof value === 'bigint' && value <= maxValue
}
