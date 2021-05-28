import {isSet} from '../is-set'

export function setNotEmpty(value: unknown): value is Set<unknown> {
    return isSet(value) && value.size > 0
}
