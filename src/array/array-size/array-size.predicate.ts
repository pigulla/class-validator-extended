/**
 * @category Predicates
 * @param value The value to validate.
 * @param size The size of the array that is allowed.
 */
export function arraySize(value: unknown, size: number): value is Array<unknown> {
    if (typeof size !== 'number' || !Number.isFinite(size)) {
        throw new TypeError('Parameter "size" must be a finite number')
    }

    return Array.isArray(value) && value.length === size
}
