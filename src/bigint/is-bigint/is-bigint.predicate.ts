/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isBigInt(value: unknown): value is bigint {
    return typeof value === 'bigint'
}
