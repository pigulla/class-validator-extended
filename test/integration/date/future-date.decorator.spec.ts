import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { FUTURE_DATE, FutureDate } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@FutureDate', () => {
    type Options = Parameters<typeof FutureDate>

    const matrix: Record<string, Options[]> = {
        'property must be a Date instance in the future': [
            [],
            [{}],
            [{ each: undefined }],
            [{ each: false }],
        ],
        'each value in property must be a Date instance in the future': [[{ each: true }]],
    }

    const mockedFutureDate = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/date/future-date/future-date.predicate.ts', {
        namedExports: {
            futureDate: mockedFutureDate,
        },
    })
    const { FutureDate: Decorator, FUTURE_DATE: SYMBOL } =
        require('../../../src/date/future-date/future-date.decorator') as {
            FutureDate: typeof FutureDate
            FUTURE_DATE: typeof FUTURE_DATE
        }

    afterEach(() => mockedFutureDate.mock.resetCalls())
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
                    assert.equal(mockedFutureDate.mock.callCount(), 1)
                    assert.deepEqual(mockedFutureDate.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
