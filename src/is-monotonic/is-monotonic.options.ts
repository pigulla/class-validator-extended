export type Selector<T> = (item: T) => number;

export enum Monotonicity {
    WEAKLY_INCREASING = 'weakly increasing',
    STRICTLY_INCREASING = 'strictly increasing',
    WEAKLY_DECREASING = 'weakly decreasing',
    STRICTLY_DECREASING = 'strictly decreasing',
}

