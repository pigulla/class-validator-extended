export function setMaxSize(value: unknown, max: number): value is Set<unknown> {
    return value instanceof Set && value.size <= max
}
