import {isMap} from '../is-map'

export function mapNotEmpty(value: unknown): value is Map<unknown, unknown> {
    return isMap(value) && value.size > 0
}
