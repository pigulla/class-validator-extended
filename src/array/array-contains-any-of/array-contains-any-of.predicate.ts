import {ArrayContainsAnyOfOptions} from './array-contains-any-of.options'

export function arrayContainsAnyOf(
    value: unknown,
    items: Iterable<unknown>,
    options: Partial<ArrayContainsAnyOfOptions> = {}
): boolean {
    const {count} = {count: 1, ...options}
    const set = new Set([...items])

    if (typeof count !== 'number' || !Number.isFinite(count)) {
        throw new TypeError('Parameter "count" must be a finite number')
    }

    return Array.isArray(value) && value.filter(item => set.has(item)).length >= count
}
