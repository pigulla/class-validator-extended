/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isSet(value: unknown): value is Set<unknown> {
    return value instanceof Set
}
