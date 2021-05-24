export function setMinSize(value: unknown, min: number): boolean {
    return value instanceof Set && value.size <= min
}
