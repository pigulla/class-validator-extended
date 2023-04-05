import matchesValidator from 'validator/lib/matches'

/**
 * @overload
 * @param value The value to validate.
 * @param {RegExp} pattern The regular expression to validate against.
 */
/**
 * @overload
 * @param value The value to validate.
 * @param {string} pattern The regular expression to validate against.
 * @param {string} modifiers The modifiers for the given regular expression.
 */
/**
 * @category Predicates
 * @param value
 * @param {string | RegExp} pattern
 * @param {string} modifiers
 */
export function notMatches(value: unknown, pattern: RegExp): value is string
export function notMatches(value: unknown, pattern: string, modifiers?: string): value is string
export function notMatches(value: unknown, pattern: RegExp | string, modifiers?: string): value is string {
    if (typeof value !== 'string') {
        return false
    }

    return !matchesValidator(value, pattern as string, modifiers)
}
