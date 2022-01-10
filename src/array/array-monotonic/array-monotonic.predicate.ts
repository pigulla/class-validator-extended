import type { ArrayMonotonicOptions } from './array-monotonic.options'
import { Monotonicity } from './array-monotonic.options'

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
            throw new TypeError('Unexpected monotonicity value')
    }
}

function compareItems<T>(a: T, b: T, options: ArrayMonotonicOptions<T>): boolean {
    if ('projection' in options) {
        return checkMonotonicity(options.projection(b) - options.projection(a), options.monotonicity)
    }

    return checkMonotonicity(options.comparator(b, a), options.monotonicity)
}

const allowedValues = new Set(Object.values(Monotonicity))

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options.
 */
export function arrayMonotonic<T>(value: unknown, options: ArrayMonotonicOptions<T>): value is Array<unknown> {
    if (!allowedValues.has(options.monotonicity)) {
        const allowedValuesString = [...allowedValues].map(value => `"${value}"`).join(', ')
        throw new TypeError(
            `Unknown monotonicity type "${options.monotonicity}" (expected one of ${allowedValuesString})`
        )
    }

    return (
        Array.isArray(value) &&
        value.every((item: T, index: number) => index === 0 || compareItems(value[index - 1], item, options))
    )
}
