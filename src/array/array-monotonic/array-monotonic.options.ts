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
 * @typeParam T The type of the array elements.
 */
export type ArrayMonotonicOptions<T> =
    | { monotonicity: Monotonicity; projection: (item: T) => number }
    | { monotonicity: Monotonicity; comparator: (a: T, b: T) => number }
    | { monotonicity: Monotonicity }
