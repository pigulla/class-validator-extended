import {Selector} from './map-unique-key.options'

export function mapUniqueKey<T, P>(value: unknown, selector: Selector<T, P>): boolean {
    if (!(value instanceof Map)) {
        return false
    }

    const seen = new Set<P>()
    const map = value as Map<T, unknown>

    for (const item of map.keys()) {
        const selected = selector(item)

        if (seen.has(selected)) {
            return false
        }

        seen.add(selected)
    }

    return true
}
