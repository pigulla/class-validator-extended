export function mapContains(value: unknown, items: unknown[]): boolean {
    if (!(value instanceof Map)) {
        return false
    }

    const values = new Set(value.values())
    return [...items].every(item => values.has(item))
}
