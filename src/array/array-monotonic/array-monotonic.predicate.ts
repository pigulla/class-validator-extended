import {ArrayMonotonicOptions, Monotonicity} from './array-monotonic.options'

function checkMonotonicity(value: number, monotonicity: Monotonicity): boolean {
    switch (monotonicity) {
        case Monotonicity.WEAKLY_INCREASING:
            return value >= 0
        case Monotonicity.STRICTLY_INCREASING:
            return value > 0
        case Monotonicity.WEAKLY_DECREASING:
            return value <= 0
        case Monotonicity.STRICTLY_DECREASING:
            return value < 0
        /* istanbul ignore next */
        default:
            throw new Error('Unexpected monotonicity value')
    }
}

function compareItems<T>(a: T, b: T, options: ArrayMonotonicOptions<T>): boolean {
    if ('selector' in options) {
        return checkMonotonicity(options.selector(b) - options.selector(a), options.monotonicity)
    }

    return checkMonotonicity(options.comparator(b, a), options.monotonicity)
}

const allowedValues = new Set(Object.values(Monotonicity))

export function arrayMonotonic<T>(values: T[], options: ArrayMonotonicOptions<T>): boolean {
    if (!allowedValues.has(options.monotonicity)) {
        const allowedValuesString = [...allowedValues].map(value => `"${value}"`).join(', ')
        throw new TypeError(
            `Unknown monotonicity type "${options.monotonicity}" (expected one of ${allowedValuesString})`
        )
    }

    return (
        Array.isArray(values) &&
        values.every((item: T, index: number) => index === 0 || compareItems(values[index - 1], item, options))
    )
}
