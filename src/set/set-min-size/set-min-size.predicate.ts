import {isSet} from '../is-set'

export function setMinSize(value: unknown, min: number): value is Set<unknown> {
    if (typeof min !== 'number' || !Number.isFinite(min)) {
        throw new TypeError('Parameter "min" must be a finite number')
    }

    return isSet(value) && value.size >= min
}
