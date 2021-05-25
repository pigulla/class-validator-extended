export function mapNotContainsKeys(value: unknown, items: unknown[]): value is Map<unknown, unknown> {
    return value instanceof Map && [...items].every(item => !value.has(item))
}
