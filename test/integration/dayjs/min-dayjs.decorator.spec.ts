import 'jest-extended'
import dayjs from 'dayjs'

import { MIN_DAYJS, MinDayjs, minDayjs } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/dayjs/min-dayjs/min-dayjs.predicate')

describe('@MinDayjs', () => {
    const mockedMinDayjs = minDayjs as unknown as jest.Mock
    const minimum = dayjs('2021-01-01T00:00:00.000Z')

    type Options = Parameters<typeof MinDayjs>
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum],
            [minimum, {}],
            [minimum, { each: undefined, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: undefined, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
            [minimum, { each: false, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [minimum, { each: false, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: false, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [minimum, { each: false, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a valid Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, { each: true, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [minimum, { each: true, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: true, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [minimum, { each: true, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, { each: undefined, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: false, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, { each: true, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [minimum, { each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object not before or on 2021-01-01T00:00:00.000Z': [
            [minimum, { each: undefined, allow_invalid: true, inclusive: true, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object not before or on 2021-01-01T00:00:00.000Z': [
            [minimum, { each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [minimum, { each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    beforeEach(() => {
        mockedMinDayjs.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MinDayjs(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MIN_DAYJS,
                    message,
                })
            })
        })
    }
})
