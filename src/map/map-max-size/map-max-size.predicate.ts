import {isMap} from '../is-map'

export function mapMaxSize(value: unknown, max: number): value is Map<unknown, unknown> {
    if (typeof max !== 'number' || !Number.isFinite(max)) {
        throw new TypeError('Parameter "max" must be a finite number')
    }

    return isMap(value) && value.size <= max
}
