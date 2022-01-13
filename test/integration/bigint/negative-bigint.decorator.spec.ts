import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { NEGATIVE_BIGINT, NegativeBigInt, negativeBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/negative-bigint/negative-bigint.predicate')

describe('@NegativeBigInt', () => {
    const mockedNegativeBigInt = negativeBigInt as unknown as jest.Mock
    const now = dayjs('2020-05-01T06:00:00.000Z')

    type Options = Parameters<typeof NegativeBigInt>
    const matrix: Record<string, Options[]> = {
        'property must be a negative BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a negative BigInt': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedNegativeBigInt.mockReturnValue(false)
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @NegativeBigInt(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: NEGATIVE_BIGINT,
                    message,
                })
            })
        })
    }
})
