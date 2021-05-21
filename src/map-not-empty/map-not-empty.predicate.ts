export function mapNotEmpty(map: unknown): boolean {
    return map instanceof Map && map.size > 0
}
