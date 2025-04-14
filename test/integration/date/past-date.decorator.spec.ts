import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { PAST_DATE, PastDate } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@PastDate', () => {
    type Options = Parameters<typeof PastDate>

    const matrix: Record<string, Options[]> = {
        'property must be a Date instance in the past': [
            [],
            [{}],
            [{ each: undefined }],
            [{ each: false }],
        ],
        'each value in property must be a Date instance in the past': [[{ each: true }]],
    }

    const mockedPastDate = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/date/past-date/past-date.predicate.ts', {
        namedExports: {
            pastDate: mockedPastDate,
        },
    })
    const { PastDate: Decorator, PAST_DATE: SYMBOL } =
        require('../../../src/date/past-date/past-date.decorator') as {
            PastDate: typeof PastDate
            PAST_DATE: typeof PAST_DATE
        }

    afterEach(() => mockedPastDate.mock.resetCalls())
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
                    assert.equal(mockedPastDate.mock.callCount(), 1)
                    assert.deepEqual(mockedPastDate.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
