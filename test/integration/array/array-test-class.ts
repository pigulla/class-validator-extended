import {ArrayContainsAnyOf, ArrayMonotonic, Monotonicity} from '../../../src'

export class ArrayTestClass {
    @ArrayMonotonic<number>({selector: n => n, monotonicity: Monotonicity.STRICTLY_INCREASING})
    strictlyIncreasingSelector: unknown = [1, 2, 3, 4, 5]

    @ArrayMonotonic<number>({comparator: (a, b) => a - b, monotonicity: Monotonicity.WEAKLY_INCREASING})
    weaklyIncreasingComparator: unknown = [1, 1, 2, 3, 5]

    @ArrayMonotonic<Date>({selector: v => v.valueOf(), monotonicity: Monotonicity.STRICTLY_DECREASING, each: true})
    eachStrictlyDecreasingSelector: unknown = [
        [
            new Date('2021-05-19T08:00:00.000Z'),
            new Date('2021-05-19T03:00:00.000Z'),
            new Date('2021-05-18T23:00:00.000Z'),
        ],
        [],
    ]

    @ArrayContainsAnyOf([1, 2, 3])
    arrayContainsAnyOf: unknown = [1, 5, 10]

    @ArrayContainsAnyOf(['a', 'b', 'c'], {count: 2})
    arrayContainsAnyTwoOf: unknown = ['a', 'c', 'e']

    @ArrayContainsAnyOf([1, 2, 3], {each: true})
    eachArrayContainsAnyOf: unknown = new Set([[1, 5, 10]])

    constructor(fields: Partial<ArrayTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof ArrayTestClass] = v
        }
    }
}
