import 'jest-extended'

import { MAP_MIN_SIZE, MapMinSize, mapMinSize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-min-size/map-min-size.predicate')

describe('@MapMinSize', () => {
    const mockedMapMinSize = mapMinSize as unknown as jest.Mock
    const minimum = 13

    type Options = Parameters<typeof MapMinSize>
    const matrix: Record<string, Options[]> = {
        'property must contain at least 13 elements': [
            [minimum],
            [minimum, {}],
            [minimum, { each: undefined }],
            [minimum, { each: false }],
        ],
        'each value in property must contain at least 13 elements': [[minimum, { each: true }]],
    }

    beforeEach(() => {
        mockedMapMinSize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapMinSize(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_MIN_SIZE,
                    message,
                })
                expect(mockedMapMinSize).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
