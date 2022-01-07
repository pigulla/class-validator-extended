import { isMap } from '../is-map'

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function mapNotEmpty(value: unknown): value is Map<unknown, unknown> {
    return isMap(value) && value.size > 0
}
