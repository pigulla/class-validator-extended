import {InvariantCallback} from './array-invariant.options'

export function arrayInvariant<T>(values: T[], callback: InvariantCallback<T>): boolean {
    return Array.isArray(values) && values.every((value, index) => callback(value, index, values))
}
