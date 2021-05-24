export function isSet(value: unknown): value is Set<unknown> {
    return value instanceof Set
}
