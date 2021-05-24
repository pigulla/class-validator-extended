import 'jest-extended'
import {arrayMonotonic, Monotonicity} from '../../src'

const identity = <T = unknown>(x: T): T => x
const direct_comparator = <T extends number>(a: T, b: T): number => a - b

describe('arrayMonotonic', () => {
    describe.each<[number[], Monotonicity]>([
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
    ])('should be true for %p that is %s', (values, monotonicity) => {
        it('when compared using a selector', () => {
            expect(arrayMonotonic(values, {selector: identity, monotonicity})).toBeTrue()
        })

        it('when compared using a comparator', () => {
            expect(arrayMonotonic(values, {comparator: direct_comparator, monotonicity})).toBeTrue()
        })
    })

    describe.each<[number[], Monotonicity]>([
        [[1, 2, 2, 3], Monotonicity.STRICTLY_INCREASING],
        [[1, 2, 3, 4, 3], Monotonicity.STRICTLY_INCREASING],

        [[1, 2, 3, 2], Monotonicity.WEAKLY_INCREASING],

        [[3, 2, 2, 1], Monotonicity.STRICTLY_DECREASING],
        [[4, 3, 2, 1, 2], Monotonicity.STRICTLY_DECREASING],

        [[3, 2, 1, 2], Monotonicity.WEAKLY_DECREASING],
    ])('should be false for %p that is %s', (values, monotonicity) => {
        it('when compared using a selector', () => {
            expect(arrayMonotonic(values, {selector: identity, monotonicity})).toBeFalse()
        })

        it('when compared using a comparator', () => {
            expect(arrayMonotonic(values, {comparator: direct_comparator, monotonicity})).toBeFalse()
        })
    })

    it('should detect invalid options', () => {
        expect(() => arrayMonotonic<number>([], {selector: identity, monotonicity: 'foo' as Monotonicity})).toThrow(
            TypeError
        )
    })

    it('should use the given selector function', () => {
        type Item = {getValue: () => number}

        const values: Item[] = [
            {getValue: jest.fn().mockReturnValue(0)},
            {getValue: jest.fn().mockReturnValue(13)},
            {getValue: jest.fn().mockReturnValue(42)},
            {getValue: jest.fn().mockReturnValue(99)},
        ]

        expect(
            arrayMonotonic<Item>(values, {
                selector: value => value.getValue(),
                monotonicity: Monotonicity.STRICTLY_INCREASING,
            })
        ).toBeTrue()
        expect(values[0].getValue).toHaveBeenCalled()
        expect(values[1].getValue).toHaveBeenCalled()
        expect(values[2].getValue).toHaveBeenCalled()
        expect(values[3].getValue).toHaveBeenCalled()
    })

    it('should use the given comparator function', () => {
        const comparator = jest.fn().mockImplementation((a, b) => a - b)

        const values: number[] = [1, 2, 3, 5]

        expect(
            arrayMonotonic<number>(values, {
                comparator,
                monotonicity: Monotonicity.STRICTLY_INCREASING,
            })
        ).toBeTrue()
        expect(comparator).toHaveBeenCalledTimes(3)
    })
})
