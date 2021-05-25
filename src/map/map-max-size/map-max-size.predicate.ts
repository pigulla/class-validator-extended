export function mapMaxSize(value: unknown, max: number): value is Map<unknown, unknown> {
    return value instanceof Map && value.size <= max
}
