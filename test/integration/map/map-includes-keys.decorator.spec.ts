import 'jest-extended'

import { MAP_INCLUDES_KEYS, MapIncludesKeys, mapIncludesKeys } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-includes-keys/map-includes-keys.predicate')

describe('@MapIncludesKeys', () => {
    const mockedMapIncludesKeys = mapIncludesKeys as unknown as jest.Mock
    const required = [1, 2, 3]

    type Options = Parameters<typeof MapIncludesKeys>
    const matrix: Record<string, Options[]> = {
        'property must include only the following keys: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must include only the following keys: 1, 2, 3': [[required, { each: true }]],
    }

    beforeEach(() => {
        mockedMapIncludesKeys.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapIncludesKeys(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_INCLUDES_KEYS,
                    message,
                })
            })
        })
    }
})
