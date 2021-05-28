import {isSet} from '../is-set'

export function setMaxSize(value: unknown, max: number): value is Set<unknown> {
    if (typeof max !== 'number' || !Number.isFinite(max)) {
        throw new TypeError('Parameter "max" must be a finite number')
    }

    return isSet(value) && value.size <= max
}
