import 'jest-extended'

import { IS_DAYJS, IsDayjs, isDayjs } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/dayjs/is-dayjs/is-dayjs.predicate')

describe('@IsDayjs', () => {
    const mockedIsDayjs = isDayjs as unknown as jest.Mock

    type Options = Parameters<typeof IsDayjs>
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object': [
            [],
            [{}],
            [{ each: undefined, allow_invalid: undefined }],
            [{ each: undefined, allow_invalid: false }],
            [{ each: false, allow_invalid: undefined }],
            [{ each: false, allow_invalid: false }],
        ],
        'each value in property must be a valid Dayjs object': [
            [{ each: true, allow_invalid: undefined }],
            [{ each: true, allow_invalid: false }],
        ],
        'property must be a Dayjs object': [
            [{ each: undefined, allow_invalid: true }],
            [{ each: false, allow_invalid: true }],
        ],
        'each value in property must be a Dayjs object': [[{ each: true, allow_invalid: true }]],
    }

    beforeEach(() => {
        mockedIsDayjs.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsDayjs(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_DAYJS,
                    message,
                })
            })
        })
    }
})
