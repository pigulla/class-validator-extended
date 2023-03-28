import 'jest-extended'

import { IS_NULL, IsNull, isNull } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/type/is-null/is-null.predicate')

describe('@IsNull', () => {
    const mockedIsNull = isNull as unknown as jest.Mock

    type Options = Parameters<typeof IsNull>
    const matrix: Record<string, Options[]> = {
        'property must be null': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be null': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsNull.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsNull(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_NULL,
                    message,
                })
            })
        })
    }
})
