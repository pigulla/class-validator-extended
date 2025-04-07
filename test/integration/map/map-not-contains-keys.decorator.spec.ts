import 'jest-extended'

import { MAP_NOT_CONTAINS_KEYS, MapNotContainsKeys, mapNotContainsKeys } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-not-contains-keys/map-not-contains-keys.predicate')

describe('@MapNotContainsKeys', () => {
    const mockedMapNotContainsKeys = mapNotContainsKeys as unknown as jest.Mock
    const forbidden = [1, 2, 3]

    type Options = Parameters<typeof MapNotContainsKeys>
    const matrix: Record<string, Options[]> = {
        'property must not contain any of the following keys: 1, 2, 3': [
            [forbidden],
            [forbidden, {}],
            [forbidden, { each: undefined }],
            [forbidden, { each: false }],
        ],
        'each value in property must not contain any of the following keys: 1, 2, 3': [[forbidden, { each: true }]],
    }

    beforeEach(() => {
        mockedMapNotContainsKeys.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapNotContainsKeys(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_NOT_CONTAINS_KEYS,
                    message,
                })
                expect(mockedMapNotContainsKeys).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
