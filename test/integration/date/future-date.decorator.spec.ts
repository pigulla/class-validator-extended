import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { FUTURE_DATE, FutureDate, futureDate } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/date/future-date/future-date.predicate')

describe('@FutureDate', () => {
    const mockedFutureDate = futureDate as unknown as jest.Mock
    const now = dayjs('2020-05-01T06:00:00.000Z')

    type Options = Parameters<typeof FutureDate>
    const matrix: Record<string, Options[]> = {
        'property must be a Date instance in the future': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a Date instance in the future': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedFutureDate.mockReturnValue(false)
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @FutureDate(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: FUTURE_DATE,
                    message,
                })
            })
        })
    }
})
