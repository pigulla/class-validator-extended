import 'jest-extended'

import { SET_UNIQUE, SetUnique, setUnique } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-unique/set-unique.predicate')

describe('@SetUnique', () => {
    const mockedSetUnique = setUnique as unknown as jest.Mock
    const projection = jest.fn()

    type Options = Parameters<typeof SetUnique>
    const matrix: Record<string, Options[]> = {
        'property must have unique values': [
            [projection],
            [projection, {}],
            [projection, { each: undefined }],
            [projection, { each: false }],
        ],
        'each value in property must have unique values': [[projection, { each: true }]],
    }

    beforeEach(() => {
        mockedSetUnique.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetUnique(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_UNIQUE,
                    message,
                })
            })
        })
    }
})
