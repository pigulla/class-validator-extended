import 'jest-extended'

import { SET_MIN_SIZE, SetMinSize, setMinSize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/set/set-min-size/set-min-size.predicate')

describe('@SetMinSize', () => {
    const mockedSetMinSize = setMinSize as unknown as jest.Mock
    const maximum = 13

    type Options = Parameters<typeof SetMinSize>
    const matrix: Record<string, Options[]> = {
        'property must contain at least 13 elements': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined }],
            [maximum, { each: false }],
        ],
        'each value in property must contain at least 13 elements': [[maximum, { each: true }]],
    }

    beforeEach(() => {
        mockedSetMinSize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @SetMinSize(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SET_MIN_SIZE,
                    message,
                })
            })
        })
    }
})
