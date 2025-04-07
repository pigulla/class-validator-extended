import 'jest-extended'

import { MAP_MAX_SIZE, MapMaxSize, mapMaxSize } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-max-size/map-max-size.predicate')

describe('@MapMaxSize', () => {
    const mockedMapMaxSize = mapMaxSize as unknown as jest.Mock
    const maximum = 13

    type Options = Parameters<typeof MapMaxSize>
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
        mockedMapMaxSize.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapMaxSize(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_MAX_SIZE,
                    message,
                })
                expect(mockedMapMaxSize).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
