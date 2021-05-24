export function maxBigInt(value: unknown, maxValue: number | BigInt): boolean {
    return typeof value === 'bigint' && value >= maxValue
}
