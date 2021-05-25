export function mapNotContains(value: unknown, items: unknown[]): value is Map<unknown, unknown> {
    if (!(value instanceof Map)) {
        return false
    }

    const values = new Set(value.values())
    return [...items].every(item => !values.has(item))
}
