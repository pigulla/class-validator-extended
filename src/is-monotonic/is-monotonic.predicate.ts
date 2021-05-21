import {Monotonicity, Selector} from './is-monotonic.options'

function compareValues(a: number, b: number, monotonicity: Monotonicity): boolean {
    switch (monotonicity) {
        case Monotonicity.WEAKLY_INCREASING:
            return b >= a
        case Monotonicity.STRICTLY_INCREASING:
            return b > a
        case Monotonicity.WEAKLY_DECREASING:
            return b <= a
        case Monotonicity.STRICTLY_DECREASING:
            return b < a
        default: {
            const allowedValues = Object.values(Monotonicity)
                .map(value => `"${value}"`)
                .join(', ')
            throw new TypeError(`Unknown monotonicity type "${monotonicity}" (expected one of ${allowedValues})`)
        }
    }
}

export function isMonotonic<T>(values: T[], selector: Selector<T>, monotonicity: Monotonicity): boolean {
    return values.reduce(
        (satisfied: boolean, item: T, index: number) =>
            satisfied && (index === 0 || compareValues(selector(values[index - 1]), selector(item), monotonicity)),
        true
    )
}
