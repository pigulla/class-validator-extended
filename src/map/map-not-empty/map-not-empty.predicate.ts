export function mapNotEmpty(value: unknown): value is Map<unknown, unknown> {
    return value instanceof Map && value.size > 0
}
