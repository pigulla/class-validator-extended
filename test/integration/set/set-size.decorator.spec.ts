import 'jest-extended'

import { SET_SIZE, SetSize, setSize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-size/set-size.predicate')

describe('@SetSize', () => {
    const mockedSetSize = setSize as unknown as jest.Mock
    const size = 13

    type Options = Parameters<typeof SetSize>
    const matrix: Record<string, Options[]> = {
        'property must contain exactly 13 element(s)': [
            [size],
            [size, {}],
            [size, { each: undefined }],
            [size, { each: false }],
        ],
        'each value in property must contain exactly 13 element(s)': [[size, { each: true }]],
    }

    beforeEach(() => {
        mockedSetSize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetSize(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_SIZE,
                    message,
                })
                expect(mockedSetSize).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
