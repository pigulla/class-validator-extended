import {isMap} from '../is-map'

export function mapMinSize(value: unknown, min: number): value is Map<unknown, unknown> {
    if (typeof min !== 'number' || !Number.isFinite(min)) {
        throw new TypeError('Parameter "min" must be a finite number')
    }

    return isMap(value) && value.size >= min
}
