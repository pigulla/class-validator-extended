export function mapMinSize(value: unknown, min: number): boolean {
    return value instanceof Map && value.size >= min
}
