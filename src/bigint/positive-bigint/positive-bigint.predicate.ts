export function positiveBigInt(value: unknown): boolean {
    return typeof value === 'bigint' && value > 0
}
