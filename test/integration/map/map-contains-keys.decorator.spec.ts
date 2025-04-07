import 'jest-extended'

import { MAP_CONTAINS_KEYS, MapContainsKeys, mapContainsKeys } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-contains-keys/map-contains-keys.predicate')

describe('@MapContainsKeys', () => {
    const mockedMapContainsKeys = mapContainsKeys as unknown as jest.Mock
    const required = [1, 2, 3]

    type Options = Parameters<typeof MapContainsKeys>
    const matrix: Record<string, Options[]> = {
        'property must contain all of the following keys: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must contain all of the following keys: 1, 2, 3': [[required, { each: true }]],
    }

    beforeEach(() => {
        mockedMapContainsKeys.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapContainsKeys(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_CONTAINS_KEYS,
                    message,
                })
                expect(mockedMapContainsKeys).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
