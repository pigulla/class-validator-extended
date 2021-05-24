export function isBigInt(value: unknown): value is BigInt {
    return typeof value === 'bigint'
}
