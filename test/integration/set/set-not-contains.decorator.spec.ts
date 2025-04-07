import 'jest-extended'

import { SET_NOT_CONTAINS, SetNotContains, setNotContains } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-not-contains/set-not-contains.predicate')

describe('@SetNotContains', () => {
    const mockedSetNotContains = setNotContains as unknown as jest.Mock
    const required = [1, 2, 3]

    type Options = Parameters<typeof SetNotContains>
    const matrix: Record<string, Options[]> = {
        'property must not contain any of the following values: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must not contain any of the following values: 1, 2, 3': [[required, { each: true }]],
    }

    beforeEach(() => {
        mockedSetNotContains.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetNotContains(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_NOT_CONTAINS,
                    message,
                })
                expect(mockedSetNotContains).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
