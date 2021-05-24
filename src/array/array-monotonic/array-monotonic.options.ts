export type Comparator<T> = (a: T, b: T) => number
export type Selector<T> = (item: T) => number

export enum Monotonicity {
    WEAKLY_INCREASING = 'weakly increasing',
    STRICTLY_INCREASING = 'strictly increasing',
    WEAKLY_DECREASING = 'weakly decreasing',
    STRICTLY_DECREASING = 'strictly decreasing',
}

export type SelectorOrComparator<T> =
    | {
          selector: Selector<T>
      }
    | {
          comparator: Comparator<T>
      }

export type ArrayMonotonicOptions<T> = SelectorOrComparator<T> & {
    monotonicity: Monotonicity
}
