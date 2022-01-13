import 'jest-extended'
import dayjs from 'dayjs'

import { MAX_DAYJS, MaxDayjs, maxDayjs } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/dayjs/max-dayjs/max-dayjs.predicate')

describe('@MaxDayjs', () => {
    const mockedMaxDayjs = maxDayjs as unknown as jest.Mock
    const maximum = dayjs('2021-01-01T00:00:00.000Z')

    type Options = Parameters<typeof MaxDayjs>
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [maximum, { each: undefined, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [maximum, { each: undefined, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [maximum, { each: undefined, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
            [maximum, { each: false, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [maximum, { each: false, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [maximum, { each: false, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [maximum, { each: false, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a valid Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [maximum, { each: true, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [maximum, { each: true, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [maximum, { each: true, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [maximum, { each: true, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [maximum, { each: undefined, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [maximum, { each: undefined, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
            [maximum, { each: undefined, allow_invalid: true, inclusive: false, granularity: undefined }],
            [maximum, { each: undefined, allow_invalid: true, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [maximum, { each: true, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [maximum, { each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object not after or on 2021-01-01T00:00:00.000Z': [
            [maximum, { each: undefined, allow_invalid: true, inclusive: true, granularity: undefined }],
            [maximum, { each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object not after or on 2021-01-01T00:00:00.000Z': [
            [maximum, { each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [maximum, { each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    beforeEach(() => {
        mockedMaxDayjs.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MaxDayjs(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAX_DAYJS,
                    message,
                })
            })
        })
    }
})
