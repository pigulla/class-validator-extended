import 'jest-extended'

import { clear } from 'jest-date-mock'

import { NEGATIVE_BIGINT, NegativeBigInt, negativeBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/negative-bigint/negative-bigint.predicate')

describe('@NegativeBigInt', () => {
    const mockedNegativeBigInt = negativeBigInt as unknown as jest.Mock

    type Options = Parameters<typeof NegativeBigInt>
    const matrix: Record<string, Options[]> = {
        'property must be a negative BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a negative BigInt': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedNegativeBigInt.mockReturnValue(false)
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @NegativeBigInt(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: NEGATIVE_BIGINT,
                    message,
                })
                expect(mockedNegativeBigInt).toHaveBeenCalledWith(value)
            })
        })
    }
})
