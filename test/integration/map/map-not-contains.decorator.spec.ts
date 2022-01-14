import 'jest-extended'

import { MAP_NOT_CONTAINS, MapNotContains, mapNotContains } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-not-contains/map-not-contains.predicate')

describe('@MapNotContains', () => {
    const mockedMapNotContains = mapNotContains as unknown as jest.Mock
    const forbidden = [1, 2, 3]

    type Options = Parameters<typeof MapNotContains>
    const matrix: Record<string, Options[]> = {
        'property must not contain any of the following values: 1, 2, 3': [
            [forbidden],
            [forbidden, {}],
            [forbidden, { each: undefined }],
            [forbidden, { each: false }],
        ],
        'each value in property must not contain any of the following values: 1, 2, 3': [[forbidden, { each: true }]],
    }

    beforeEach(() => {
        mockedMapNotContains.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapNotContains(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_NOT_CONTAINS,
                    message,
                })
            })
        })
    }
})
