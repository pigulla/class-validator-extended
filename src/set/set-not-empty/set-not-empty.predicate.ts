export function setNotEmpty(value: unknown): value is Set<unknown> {
    return value instanceof Set && value.size > 0
}
