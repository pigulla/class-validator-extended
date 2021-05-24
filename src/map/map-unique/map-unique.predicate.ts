import {Selector} from './map-unique.options'

export function mapUnique<T, P>(value: unknown, selector: Selector<T, P>): boolean {
    if (!(value instanceof Map)) {
        return false
    }

    const seen = new Set<P>()
    const map = value as Map<unknown, T>

    for (const item of map.values()) {
        const selected = selector(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
