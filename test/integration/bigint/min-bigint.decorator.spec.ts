import 'jest-extended'

import { clear } from 'jest-date-mock'

import { MIN_BIGINT, MinBigInt, minBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/min-bigint/min-bigint.predicate')

describe('@MinBigInt', () => {
    const mockedMinBigInt = minBigInt as unknown as jest.Mock
    const min = BigInt(9_000)

    type Options = Parameters<typeof MinBigInt>
    const matrix: Record<string, Options[]> = {
        'property must not be less than 9000': [[min], [min, {}], [min, { each: undefined }], [min, { each: false }]],
        'each value in property must not be less than 9000': [[min, { each: true }]],
    }

    beforeEach(() => {
        mockedMinBigInt.mockReturnValue(false)
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %o', options => {
                class TestClass {
                    @MinBigInt(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MIN_BIGINT,
                    message,
                })
                expect(mockedMinBigInt).toHaveBeenCalledWith(value, options[0])
            })
        })
    }
})
