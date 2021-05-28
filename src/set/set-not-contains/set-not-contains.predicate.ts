import {isSet} from '../is-set'

export function setNotContains(value: unknown, items: Iterable<unknown>): value is Set<unknown> {
    return isSet(value) && [...items].every(item => !value.has(item))
}
