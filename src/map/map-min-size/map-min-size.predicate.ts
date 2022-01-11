import { isMap } from '../../map/is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param minimum The minimum size of the map that is allowed.
 */
export function mapMinSize(value: unknown, minimum: number): value is Map<unknown, unknown> {
    if (typeof minimum !== 'number' || !Number.isFinite(minimum)) {
        throw new TypeError('Parameter "minimum" must be a finite number')
    }

    return isMap(value) && value.size >= minimum
}
