import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { arrayMonotonic, Monotonicity } from '../../../src'
import { describeEach } from '../../util'

const identity = (x: number): number => x
const comparator = (a: number, b: number): number => a - b

describe('arrayMonotonic', () => {
    describeEach<[number[], Monotonicity]>([
        [[], Monotonicity.STRICTLY_INCREASING],
        [[1], Monotonicity.STRICTLY_INCREASING],
        [[1, 2, 3, 4, 5], Monotonicity.STRICTLY_INCREASING],

        [[], Monotonicity.WEAKLY_INCREASING],
        [[1], Monotonicity.WEAKLY_INCREASING],
        [[1, 2, 3, 4, 5], Monotonicity.WEAKLY_INCREASING],
        [[1, 2, 3, 3, 3, 4, 5], Monotonicity.WEAKLY_INCREASING],

        [[], Monotonicity.STRICTLY_DECREASING],
        [[1], Monotonicity.STRICTLY_DECREASING],
        [[5, 4, 3, 2, 1], Monotonicity.STRICTLY_DECREASING],

        [[], Monotonicity.WEAKLY_DECREASING],
        [[1], Monotonicity.WEAKLY_DECREASING],
        [[5, 4, 3, 2, 1], Monotonicity.WEAKLY_DECREASING],
        [[5, 4, 3, 3, 3, 2, 1], Monotonicity.WEAKLY_DECREASING],
    ])('should be true for %j that is %s', (values, monotonicity) => {
        it('when compared using a selector', () => {
            assert.equal(arrayMonotonic(values, { projection: identity, monotonicity }), true)
        })

        it('when compared using a comparator', () => {
            assert.equal(arrayMonotonic(values, { comparator, monotonicity }), true)
        })

        it('when compared ordinally', () => {
            assert.equal(arrayMonotonic(values, { monotonicity }), true)
        })
    })

    describeEach<[number[], Monotonicity]>([
        [[1, 2, 2, 3], Monotonicity.STRICTLY_INCREASING],
        [[1, 2, 3, 4, 3], Monotonicity.STRICTLY_INCREASING],

        [[1, 2, 3, 2], Monotonicity.WEAKLY_INCREASING],

        [[3, 2, 2, 1], Monotonicity.STRICTLY_DECREASING],
        [[4, 3, 2, 1, 2], Monotonicity.STRICTLY_DECREASING],

        [[3, 2, 1, 2], Monotonicity.WEAKLY_DECREASING],
    ])('should be false for %j that is %s', (values, monotonicity) => {
        it('when compared using a selector', () => {
            assert.equal(
                arrayMonotonic<number>(values, { projection: identity, monotonicity }),
                false,
            )
        })

        it('when compared using a comparator', () => {
            assert.equal(arrayMonotonic(values, { comparator, monotonicity }), false)
        })

        it('when compared ordinally', () => {
            assert.equal(arrayMonotonic(values, { monotonicity }), false)
        })
    })

    it('should detect invalid options', () => {
        assert.throws(
            () =>
                arrayMonotonic<number>([], {
                    projection: identity,
                    monotonicity: 'foo' as Monotonicity,
                }),
            TypeError,
        )
    })

    // it('should use the given selector function', () => {
    //     type Item = { getValue: () => number }
    //
    //     const values: Item[] = [
    //         { getValue: jest.fn().mockReturnValue(0) },
    //         { getValue: jest.fn().mockReturnValue(13) },
    //         { getValue: jest.fn().mockReturnValue(42) },
    //         { getValue: jest.fn().mockReturnValue(99) },
    //     ]
    //
    //     expect(
    //         arrayMonotonic<Item>(values, {
    //             projection: value => value.getValue(),
    //             monotonicity: Monotonicity.STRICTLY_INCREASING,
    //         })
    //     ).toBeTrue()
    //     expect(values[0].getValue).toHaveBeenCalled()
    //     expect(values[1].getValue).toHaveBeenCalled()
    //     expect(values[2].getValue).toHaveBeenCalled()
    //     expect(values[3].getValue).toHaveBeenCalled()
    // })
    //
    // it('should use the given comparator function', () => {
    //     const comparator = jest.fn().mockImplementation((a, b) => a - b)
    //
    //     const values: number[] = [1, 2, 3, 5]
    //
    //     assert.equal(
    //         arrayMonotonic<number>(values, {
    //             comparator,
    //             monotonicity: Monotonicity.STRICTLY_INCREASING,
    //         }),
    //         true
    //     )
    //     expect(comparator).toHaveBeenCalledTimes(3)
    // })
})
