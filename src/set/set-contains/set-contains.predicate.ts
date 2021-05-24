export function setContains(value: unknown, items: unknown[]): boolean {
    return value instanceof Set && [...items].every(item => value.has(item))
}
