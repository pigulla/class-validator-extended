import {isMap} from '../is-map'

export function mapContainsKeys(value: unknown, items: Iterable<unknown>): value is Map<unknown, unknown> {
    return isMap(value) && [...items].every(item => value.has(item))
}
