import 'jest-extended'

import { clear } from 'jest-date-mock'

import { MAX_BIGINT, MaxBigInt, maxBigInt } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/bigint/max-bigint/max-bigint.predicate')

describe('@MaxBigInt', () => {
    const mockedMaxBigInt = maxBigInt as unknown as jest.Mock
    const max = BigInt(9_000)

    type Options = Parameters<typeof MaxBigInt>
    const matrix: Record<string, Options[]> = {
        'property must not be larger than 9000': [[max], [max, {}], [max, { each: undefined }], [max, { each: false }]],
        'each value in property must not be larger than 9000': [[max, { each: true }]],
    }

    beforeEach(() => {
        mockedMaxBigInt.mockReturnValue(false)
    })

    afterEach(() => {
        clear()
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %o', options => {
                class TestClass {
                    @MaxBigInt(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAX_BIGINT,
                    message,
                })
            })
        })
    }
})
