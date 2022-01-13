import 'jest-extended'

import { IS_BIGINT, IsBigInt, isBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/is-bigint/is-bigint.predicate')

describe('@IsBigInt', () => {
    const mockedIsBigInt = isBigInt as unknown as jest.Mock

    type Options = Parameters<typeof IsBigInt>
    const matrix: Record<string, Options[]> = {
        'property must be a BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a BigInt': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsBigInt.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsBigInt(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_BIGINT,
                    message,
                })
            })
        })
    }
})
