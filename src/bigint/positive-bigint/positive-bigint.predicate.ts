export function positiveBigInt(value: unknown): value is BigInt {
    return typeof value === 'bigint' && value > 0
}
