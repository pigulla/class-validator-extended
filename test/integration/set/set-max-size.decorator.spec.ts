import 'jest-extended'

import { SET_MAX_SIZE, SetMaxSize, setMaxSize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-max-size/set-max-size.predicate')

describe('@SetMaxSize', () => {
    const mockedSetMaxSize = setMaxSize as unknown as jest.Mock
    const maximum = 13

    type Options = Parameters<typeof SetMaxSize>
    const matrix: Record<string, Options[]> = {
        'property must contain not more than 13 elements': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined }],
            [maximum, { each: false }],
        ],
        'each value in property must contain not more than 13 elements': [[maximum, { each: true }]],
    }

    beforeEach(() => {
        mockedSetMaxSize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetMaxSize(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_MAX_SIZE,
                    message,
                })
                expect(mockedSetMaxSize).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
