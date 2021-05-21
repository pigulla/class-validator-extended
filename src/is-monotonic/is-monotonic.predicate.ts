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
        /* istanbul ignore next */
        default:
            throw new Error('Unexpected monotonicity value')
    }
}

const allowedValues = new Set(Object.values(Monotonicity))

export function isMonotonic<T>(values: T[], selector: Selector<T>, monotonicity: Monotonicity): boolean {
    if (!allowedValues.has(monotonicity)) {
        const allowedValuesString = [...allowedValues].map(value => `"${value}"`).join(', ')
        throw new TypeError(`Unknown monotonicity type "${monotonicity}" (expected one of ${allowedValuesString})`)
    }

    return values.reduce(
        (satisfied: boolean, item: T, index: number) =>
            satisfied && (index === 0 || compareValues(selector(values[index - 1]), selector(item), monotonicity)),
        true
    )
}
