export function negativeBigInt(value: unknown): value is BigInt {
    return typeof value === 'bigint' && value < 0
}
