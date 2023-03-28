/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
    return value instanceof Map
}
