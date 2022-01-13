import 'jest-extended'

import { SET_CONTAINS, SetContains, setContains } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-contains/set-contains.predicate')

describe('@SetContains', () => {
    const mockedSetContains = setContains as unknown as jest.Mock
    const required = [1, 2, 3]

    type Options = Parameters<typeof SetContains>
    const matrix: Record<string, Options[]> = {
        'property must contain all of the following values: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must contain all of the following values: 1, 2, 3': [[required, { each: true }]],
    }

    beforeEach(() => {
        mockedSetContains.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetContains(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_CONTAINS,
                    message,
                })
            })
        })
    }
})
