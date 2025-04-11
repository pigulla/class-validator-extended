const regExp = /^[a-z]{2}-[a-z]+-([1-9]\d*)$/

/**
 * @category Predicates
 * @deprecated
 * @param value The value to validate.
 */
export function isAwsRegion(value: unknown): value is string {
    return typeof value === 'string' && regExp.test(value)
}
