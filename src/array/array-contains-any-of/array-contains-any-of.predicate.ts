export function arrayContainsAnyOf(value: unknown, items: Iterable<unknown>): boolean {
    const set = new Set([...items])

    return Array.isArray(value) && value.some((item: unknown) => set.has(item))
}
