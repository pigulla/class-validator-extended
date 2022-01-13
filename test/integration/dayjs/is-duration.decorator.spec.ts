import 'jest-extended'

import { IS_DURATION, IsDuration, isDuration } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/dayjs/is-duration/is-duration.predicate')

describe('@IsDuration', () => {
    const mockedIsDuration = isDuration as unknown as jest.Mock

    type Options = Parameters<typeof IsDuration>
    const matrix: Record<string, Options[]> = {
        'property must be a Dayjs duration object': [[{ each: undefined }], [{ each: false }]],
        'each value in property must be a Dayjs duration object': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsDuration.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsDuration(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_DURATION,
                    message,
                })
            })
        })
    }
})
