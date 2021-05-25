export function minBigInt(value: unknown, minValue: number | BigInt): value is BigInt {
    return typeof value === 'bigint' && value >= minValue
}
