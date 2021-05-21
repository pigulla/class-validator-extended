import 'jest-extended';
import { isMonotonic, Monotonicity } from '~domain/validator';

describe('isMonotonic', () => {
    const selector = (n: number) => n;

    it.each([
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
    ])('should be true for %p that is %s', (values: number[], monotonicity: Monotonicity) => {
        expect(isMonotonic(values, selector, monotonicity)).toBeTrue();
    });

    it.each([
        [[1, 2, 2, 3], Monotonicity.STRICTLY_INCREASING],
        [[1, 2, 3, 4, 3], Monotonicity.STRICTLY_INCREASING],

        [[1, 2, 3, 2], Monotonicity.WEAKLY_INCREASING],

        [[3, 2, 2, 1], Monotonicity.STRICTLY_DECREASING],
        [[4, 3, 2, 1, 2], Monotonicity.STRICTLY_DECREASING],

        [[3, 2, 1, 2], Monotonicity.WEAKLY_DECREASING],
    ])('should be false for %p that is %s', (values: number[], monotonicity: Monotonicity) => {
        expect(isMonotonic(values, selector, monotonicity)).toBeFalse();
    });
});
