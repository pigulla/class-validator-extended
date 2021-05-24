export function mapMaxSize(value: unknown, max: number): boolean {
    return value instanceof Map && value.size <= max
}
