import 'jest-extended'

import { ARRAY_MONOTONIC, ArrayMonotonic, arrayMonotonic, Monotonicity } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/array/array-monotonic/array-monotonic.predicate')

describe('@ArrayMonotonic', () => {
    const mockedArrayMonotonic = arrayMonotonic as unknown as jest.Mock

    type Options = Parameters<typeof ArrayMonotonic>
    const matrix: Record<string, Options[]> = {
        'property must be a weakly decreasing array': [
            [{ monotonicity: Monotonicity.WEAKLY_DECREASING }],
            [{ monotonicity: Monotonicity.WEAKLY_DECREASING, each: undefined }],
            [{ monotonicity: Monotonicity.WEAKLY_DECREASING, each: false }],
        ],
        'each value in property must be a strictly increasing array': [
            [{ monotonicity: Monotonicity.STRICTLY_INCREASING, each: true }],
        ],
    }

    beforeEach(() => {
        mockedArrayMonotonic.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @ArrayMonotonic(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: ARRAY_MONOTONIC,
                    message,
                })
                expect(mockedArrayMonotonic).toHaveBeenCalledWith(value, { monotonicity: options[0].monotonicity })
            })
        })
    }
})
