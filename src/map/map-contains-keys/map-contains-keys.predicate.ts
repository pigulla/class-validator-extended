export function mapContainsKeys(value: unknown, items: unknown[]): boolean {
    return value instanceof Map && [...items].every(item => value.has(item))
}
