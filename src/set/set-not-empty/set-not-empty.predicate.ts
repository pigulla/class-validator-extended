export function setNotEmpty(set: unknown): boolean {
    return set instanceof Set && set.size > 0
}
