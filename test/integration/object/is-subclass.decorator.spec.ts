import 'jest-extended'

import { IS_SUBCLASS, IsSubclass, isSubclass } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/object/is-subclass/is-subclass.predicate')

class A {}

describe('@IsSubclass', () => {
    const mockedIsSubclass = isSubclass as unknown as jest.Mock

    type Options = Parameters<typeof IsSubclass>
    const matrix: Record<string, Options[]> = {
        'property must be an instance of A or one of its subclasses': [[A], [A, {}]],
        'each value in property must be an instance of A or one of its subclasses': [[A, { each: true }]],
    }

    beforeEach(() => {
        mockedIsSubclass.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsSubclass(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_SUBCLASS,
                    message,
                })
            })
        })
    }
})
