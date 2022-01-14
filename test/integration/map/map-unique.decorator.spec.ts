import 'jest-extended'

import { MAP_UNIQUE, MapUnique, mapUnique } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-unique/map-unique.predicate')

describe('@MapUnique', () => {
    const mockedMapUnique = mapUnique as unknown as jest.Mock
    const projection = jest.fn()

    type Options = Parameters<typeof MapUnique>
    const matrix: Record<string, Options[]> = {
        'property must have unique values': [
            [projection],
            [projection, {}],
            [projection, { each: undefined }],
            [projection, { each: false }],
        ],
        'each value in property must have unique values': [[projection, { each: true }]],
    }

    beforeEach(() => {
        mockedMapUnique.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapUnique(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_UNIQUE,
                    message,
                })
            })
        })
    }
})
