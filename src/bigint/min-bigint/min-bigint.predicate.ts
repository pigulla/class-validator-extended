export function minBigInt(value: unknown, minValue: number | BigInt): boolean {
    return typeof value === 'bigint' && value >= minValue
}
