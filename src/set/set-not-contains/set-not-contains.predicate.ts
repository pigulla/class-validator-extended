export function setNotContains(value: unknown, items: unknown[]): value is Set<unknown> {
    return value instanceof Set && [...items].every(item => !value.has(item))
}
