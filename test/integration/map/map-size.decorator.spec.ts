import 'jest-extended'

import { MAP_SIZE, MapSize, mapSize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-size/map-size.predicate')

describe('@MapSize', () => {
    const mockedMapSize = mapSize as unknown as jest.Mock
    const size = 13

    type Options = Parameters<typeof MapSize>
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
        mockedMapSize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapSize(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_SIZE,
                    message,
                })
                expect(mockedMapSize).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
