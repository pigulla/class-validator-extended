import 'jest-extended'

import { IS_TIMEZONE, IsTimezone, isTimezone } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/string/is-timezone/is-timezone.predicate')

describe('@IsTimezone', () => {
    const mockedIsAwsRegion = isTimezone as unknown as jest.Mock

    type Options = Parameters<typeof IsTimezone>
    const matrix: Record<string, Options[]> = {
        'property must be a timezone string': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a timezone string': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsAwsRegion.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsTimezone(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_TIMEZONE,
                    message,
                })
            })
        })
    }
})
