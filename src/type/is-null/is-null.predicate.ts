/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isNull(value: unknown): value is null {
    return value === null
}
