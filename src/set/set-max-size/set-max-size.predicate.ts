export function setMaxSize(value: unknown, max: number): boolean {
    return value instanceof Set && value.size <= max
}
