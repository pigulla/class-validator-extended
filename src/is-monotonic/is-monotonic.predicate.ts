import {Monotonicity, Selector} from './is-monotonic.options'

function compareValues(a: number, b: number, monotonicity: Monotonicity): boolean {
    if (monotonicity === Monotonicity.WEAKLY_INCREASING) {
        return b >= a
    }
    if (monotonicity === Monotonicity.STRICTLY_INCREASING) {
        return b > a
    }
    if (monotonicity === Monotonicity.WEAKLY_DECREASING) {
        return b <= a
    }
    return b < a
}

export function isMonotonic<T>(values: T[], selector: Selector<T>, monotonicity: Monotonicity): boolean {
    return values.reduce(
        (satisfied: boolean, item: T, index: number) =>
            satisfied && (index === 0 || compareValues(selector(values[index - 1]), selector(item), monotonicity)),
        true
    )
}
