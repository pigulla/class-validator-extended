import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { PAST_DATE, PastDate, pastDate } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/date/past-date/past-date.predicate')

describe('@PastDate', () => {
    const mockedPastDate = pastDate as unknown as jest.Mock
    const now = dayjs('2020-05-01T06:00:00.000Z')

    type Options = Parameters<typeof PastDate>
    const matrix: Record<string, Options[]> = {
        'property must be a Date instance in the past': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a Date instance in the past': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedPastDate.mockReturnValue(false)
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @PastDate(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: PAST_DATE,
                    message,
                })
            })
        })
    }
})
