import {Selector} from './set-unique.options'

export function setUnique<T, P>(value: unknown, selector: Selector<T, P>): boolean {
    if (!(value instanceof Set)) {
        return false
    }

    const seen = new Set<P>()
    const set = value as Set<T>

    for (const item of set.keys()) {
        const selected = selector(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
