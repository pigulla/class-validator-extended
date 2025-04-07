import 'jest-extended'

import { clear } from 'jest-date-mock'

import { POSITIVE_BIGINT, PositiveBigInt, positiveBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/positive-bigint/positive-bigint.predicate')

describe('@PositiveBigInt', () => {
    const mockedPositiveBigInt = positiveBigInt as unknown as jest.Mock

    type Options = Parameters<typeof PositiveBigInt>
    const matrix: Record<string, Options[]> = {
        'property must be a positive BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a positive BigInt': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedPositiveBigInt.mockReturnValue(false)
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @PositiveBigInt(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: POSITIVE_BIGINT,
                    message,
                })
                expect(mockedPositiveBigInt).toHaveBeenCalledWith(value)
            })
        })
    }
})
