import 'jest-extended'

import { IS_MAP, IsMap, isMap } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/is-map/is-map.predicate')

describe('@IsMap', () => {
    const mockedIsMap = isMap as unknown as jest.Mock

    type Options = Parameters<typeof IsMap>
    const matrix: Record<string, Options[]> = {
        'property must be an instance of Map': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an instance of Map': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsMap.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsMap(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_MAP,
                    message,
                })
            })
        })
    }
})
