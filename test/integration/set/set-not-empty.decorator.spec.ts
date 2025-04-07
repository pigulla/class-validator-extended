import 'jest-extended'

import { SET_NOT_EMPTY, SetNotEmpty, setNotEmpty } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-not-empty/set-not-empty.predicate')

describe('@SetNotEmpty', () => {
    const mockedSetNotEmpty = setNotEmpty as unknown as jest.Mock

    type Options = Parameters<typeof SetNotEmpty>
    const matrix: Record<string, Options[]> = {
        'property must not be an empty set': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must not be an empty set': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedSetNotEmpty.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetNotEmpty(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_NOT_EMPTY,
                    message,
                })
                expect(mockedSetNotEmpty).toHaveBeenCalledWith(value)
            })
        })
    }
})
