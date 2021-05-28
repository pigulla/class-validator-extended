import {isMap} from '../is-map'

export function mapContains(value: unknown, items: Iterable<unknown>): value is Map<unknown, unknown> {
    if (!isMap(value)) {
        return false
    }

    const values = new Set(value.values())
    return [...items].every(item => values.has(item))
}
