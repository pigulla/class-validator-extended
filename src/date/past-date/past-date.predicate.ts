/**
 * @category Predicates
 * @param value The value to validate.
 */
export function pastDate(value: unknown): value is Date {
    return value instanceof Date && value.getTime() < Date.now()
}
