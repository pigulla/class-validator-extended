import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param size The size of the map that is allowed.
 */
export function mapSize(value: unknown, size: number): value is Map<unknown, unknown> {
    if (typeof size !== 'number' || !Number.isFinite(size)) {
        throw new TypeError('Parameter "size" must be a finite number')
    }

    return isMap(value) && value.size === size
}
