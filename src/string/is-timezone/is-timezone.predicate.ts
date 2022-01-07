/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isTimezone(value: unknown): value is string {
    if (typeof value !== 'string') {
        return false
    }

    try {
        new Intl.DateTimeFormat('default', { timeZone: value })
        return true
    } catch (error) {
        if (error instanceof RangeError && /Invalid time zone/.test(error.message)) {
            return false
        }

        throw error
    }
}
