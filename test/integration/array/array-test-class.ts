import {ArrayMonotonic, Monotonicity} from '../../../src'

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

    constructor(fields: Partial<ArrayTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            if (v !== undefined && Object.prototype.hasOwnProperty.call(this, k)) {
                this[k as keyof ArrayTestClass] = v
            }
        }
    }
}
