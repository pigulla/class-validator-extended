/**
 * @category Predicates
 * @param value The value to validate.
 */
export function futureDate(value: unknown): value is Date {
    return value instanceof Date && value.getTime() > Date.now()
}
