import 'jest-extended'

import { PAST_DAYJS, PastDayjs, pastDayjs } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/dayjs/past-dayjs/past-dayjs.predicate')

describe('@PastDayjs', () => {
    const mockedPastDayjs = pastDayjs as unknown as jest.Mock

    type Options = Parameters<typeof PastDayjs>
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object in the past': [
            [],
            [{}],
            [{ each: undefined, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [{ each: undefined, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [{ each: undefined, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [{ each: undefined, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
            [{ each: false, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [{ each: false, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [{ each: false, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [{ each: false, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a valid Dayjs object in the past': [
            [{ each: true, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [{ each: true, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [{ each: true, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [{ each: true, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object in the past': [
            [{ each: undefined, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [{ each: undefined, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
            [{ each: undefined, allow_invalid: true, inclusive: false, granularity: undefined }],
            [{ each: undefined, allow_invalid: true, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object in the past': [
            [{ each: true, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [{ each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object in the past or today': [
            [{ each: undefined, allow_invalid: true, inclusive: true, granularity: undefined }],
            [{ each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object in the past or today': [
            [{ each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [{ each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    beforeEach(() => {
        mockedPastDayjs.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @PastDayjs(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: PAST_DAYJS,
                    message,
                })
            })
        })
    }
})
