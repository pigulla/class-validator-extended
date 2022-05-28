export type Constructor<T extends object = object> =
    | (abstract new (...parameters: unknown[]) => T)
    | (new (...parameters: unknown[]) => T)

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isSubclass<T extends object = object>(value: unknown, targetType: Constructor<T>): value is T {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    return value instanceof targetType
}
