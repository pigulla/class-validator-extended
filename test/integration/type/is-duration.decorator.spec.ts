import 'jest-extended'

import { IS_DURATION, IsDuration, isDuration } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/type/is-duration/is-duration.predicate')

describe('@IsDuration', () => {
    const mockedIsDuration = isDuration as unknown as jest.Mock

    type Options = Parameters<typeof IsDuration>
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs duration': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a valid Dayjs duration': [[{ each: true }]],
        'property must be a Dayjs duration': [
            [{ allow_invalid: true }],
            [{ allow_invalid: true, each: undefined }],
            [{ allow_invalid: true, each: false }],
        ],
        'each value in property must be a Dayjs duration': [[{ allow_invalid: true, each: true }]],
    }

    beforeEach(() => {
        mockedIsDuration.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsDuration(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_DURATION,
                    message,
                })
                expect(mockedIsDuration).toHaveBeenCalledWith(value, { allow_invalid: options[0]?.allow_invalid })
            })
        })
    }
})
