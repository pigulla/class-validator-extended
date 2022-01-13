import 'jest-extended'

import dayjs from 'dayjs'
import { advanceTo, clear } from 'jest-date-mock'

import { POSITIVE_BIGINT, PositiveBigInt, positiveBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/positive-bigint/positive-bigint.predicate')

describe('@PositiveBigInt', () => {
    const mockedPositiveBigInt = positiveBigInt as unknown as jest.Mock
    const now = dayjs('2020-05-01T06:00:00.000Z')

    type Options = Parameters<typeof PositiveBigInt>
    const matrix: Record<string, Options[]> = {
        'property must be a positive BigInt': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be a positive BigInt': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedPositiveBigInt.mockReturnValue(false)
        advanceTo(now.toDate())
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @PositiveBigInt(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: POSITIVE_BIGINT,
                    message,
                })
            })
        })
    }
})
