import 'jest-extended'

import { MAP_UNIQUE_KEYS, MapUniqueKeys, mapUniqueKeys } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-unique-keys/map-unique-keys.predicate')

describe('@MapUniqueKeys', () => {
    const mockedMapUniqueKeys = mapUniqueKeys as unknown as jest.Mock
    const projection = jest.fn()

    type Options = Parameters<typeof MapUniqueKeys>
    const matrix: Record<string, Options[]> = {
        'property must have unique keys': [
            [projection],
            [projection, {}],
            [projection, { each: undefined }],
            [projection, { each: false }],
        ],
        'each value in property must have unique keys': [[projection, { each: true }]],
    }

    beforeEach(() => {
        mockedMapUniqueKeys.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapUniqueKeys(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_UNIQUE_KEYS,
                    message,
                })
                expect(mockedMapUniqueKeys).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
