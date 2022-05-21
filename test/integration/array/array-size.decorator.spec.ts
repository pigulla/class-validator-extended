import 'jest-extended'

import { ARRAY_SIZE, ArraySize, arraySize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/array/array-size/array-size.predicate')

describe('@ArraySize', () => {
    const mockedArraySize = arraySize as unknown as jest.Mock
    const size = 13

    type Options = Parameters<typeof ArraySize>
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
        mockedArraySize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @ArraySize(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: ARRAY_SIZE,
                    message,
                })
            })
        })
    }
})
