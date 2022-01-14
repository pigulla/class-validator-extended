/**
 * @category Types
 */
import type { RequireExactlyOne } from 'type-fest'

export type ArrayMonotonicityComparator<T> = (a: T, b: T) => number

/**
 * @category Types
 */
export type ArrayMonotonicityProjection<T> = (item: T) => number

/**
 * @category Types
 */
export enum Monotonicity {
    WEAKLY_INCREASING = 'weakly increasing',
    STRICTLY_INCREASING = 'strictly increasing',
    WEAKLY_DECREASING = 'weakly decreasing',
    STRICTLY_DECREASING = 'strictly decreasing',
}

/**
 * @category Types
 */
export type ArrayMonotonicityFunction<T> = {
    projection: ArrayMonotonicityProjection<T>
    comparator: ArrayMonotonicityComparator<T>
}

/**
 * @category Types
 */
export type ArrayMonotonicOptions<T> = Partial<
    RequireExactlyOne<ArrayMonotonicityFunction<T>, 'projection' | 'comparator'>
> & {
    monotonicity: Monotonicity
}
