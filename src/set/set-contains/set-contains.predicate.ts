import {isSet} from '../is-set'

export function setContains(value: unknown, items: Iterable<unknown>): value is Set<unknown> {
    return isSet(value) && [...items].every(item => value.has(item))
}
