import 'jest-extended'

import { MAP_CONTAINS, MapContains, mapContains } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-contains/map-contains.predicate')

describe('@MapContains', () => {
    const mockedMapContains = mapContains as unknown as jest.Mock
    const required = [1, 2, 3]

    type Options = Parameters<typeof MapContains>
    const matrix: Record<string, Options[]> = {
        'property must contain all of the following values: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must contain all of the following values: 1, 2, 3': [[required, { each: true }]],
    }

    beforeEach(() => {
        mockedMapContains.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapContains(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_CONTAINS,
                    message,
                })
                expect(mockedMapContains).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
