export function setMinSize(value: unknown, min: number): value is Set<unknown> {
    return value instanceof Set && value.size <= min
}
