import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { ARRAY_MONOTONIC, ArrayMonotonic } from '../../../src'
import { Monotonicity } from '../../../src/array/array-monotonic/array-monotonic.options'
import { expectValidationError, itEach } from '../../util'

describe('@ArrayMonotonic', () => {
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

    const mockedArrayMonotonic = mock.fn(() => false)
    const mockedModule = mock.module(
        '../../../src/array/array-monotonic/array-monotonic.predicate.ts',
        {
            namedExports: {
                arrayMonotonic: mockedArrayMonotonic,
            },
        },
    )
    const { ArrayMonotonic: Decorator, ARRAY_MONOTONIC: SYMBOL } =
        require('../../../src/array/array-monotonic/array-monotonic.decorator') as {
            ArrayMonotonic: typeof ArrayMonotonic
            ARRAY_MONOTONIC: typeof ARRAY_MONOTONIC
        }

    afterEach(() => mockedArrayMonotonic.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))(
                'when called with options %j',
                options => {
                    class TestClass {
                        @Decorator(...options)
                        property: unknown = value
                    }

                    expectValidationError(new TestClass(), {
                        property: 'property',
                        constraint: SYMBOL,
                        message,
                    })
                    assert.equal(mockedArrayMonotonic.mock.callCount(), 1)
                    assert.deepEqual(mockedArrayMonotonic.mock.calls[0].arguments, [
                        value,
                        { monotonicity: options[0].monotonicity },
                    ])
                },
            )
        })
    }
})
