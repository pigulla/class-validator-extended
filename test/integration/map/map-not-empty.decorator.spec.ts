import 'jest-extended'

import { MAP_NOT_EMPTY, MapNotEmpty, mapNotEmpty } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/map/map-not-empty/map-not-empty.predicate')

describe('@MapNotEmpty', () => {
    const mockedMapNotEmpty = mapNotEmpty as unknown as jest.Mock

    type Options = Parameters<typeof MapNotEmpty>
    const matrix: Record<string, Options[]> = {
        'property must not be an empty map': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must not be an empty map': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedMapNotEmpty.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MapNotEmpty(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAP_NOT_EMPTY,
                    message,
                })
                expect(mockedMapNotEmpty).toHaveBeenCalledWith(value)
            })
        })
    }
})
