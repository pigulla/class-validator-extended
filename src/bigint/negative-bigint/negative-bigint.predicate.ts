export function negativeBigInt(value: unknown): boolean {
    return typeof value === 'bigint' && value < 0
}
