import 'jest-extended'

import { IS_SET, IsSet, isSet } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/type/is-set/is-set.predicate')

describe('@IsSet', () => {
    const mockedIsSet = isSet as unknown as jest.Mock

    type Options = Parameters<typeof IsSet>
    const matrix: Record<string, Options[]> = {
        'property must be an instance of Set': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an instance of Set': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsSet.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsSet(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_SET,
                    message,
                })
            })
        })
    }
})
