export function mapMinSize(value: unknown, min: number): value is Map<unknown, unknown> {
    return value instanceof Map && value.size >= min
}
