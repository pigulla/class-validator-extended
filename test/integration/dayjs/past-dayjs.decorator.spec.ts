import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { PAST_DAYJS, PastDayjs } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@PastDayjs', () => {
    type Options = Parameters<typeof PastDayjs>

    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object in the past': [
            [],
            [{}],
            [
                {
                    each: undefined,
                    allow_invalid: undefined,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [
                {
                    each: undefined,
                    allow_invalid: false,
                    inclusive: undefined,
                    granularity: 'minutes',
                },
            ],
            [
                {
                    each: undefined,
                    allow_invalid: undefined,
                    inclusive: false,
                    granularity: undefined,
                },
            ],
            [{ each: undefined, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
            [
                {
                    each: false,
                    allow_invalid: undefined,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [{ each: false, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [{ each: false, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [{ each: false, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a valid Dayjs object in the past': [
            [
                {
                    each: true,
                    allow_invalid: undefined,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [{ each: true, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [{ each: true, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [{ each: true, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object in the past': [
            [
                {
                    each: undefined,
                    allow_invalid: true,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [
                {
                    each: undefined,
                    allow_invalid: true,
                    inclusive: undefined,
                    granularity: 'minutes',
                },
            ],
            [{ each: undefined, allow_invalid: true, inclusive: false, granularity: undefined }],
            [{ each: undefined, allow_invalid: true, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object in the past': [
            [{ each: true, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [{ each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object in the past or today': [
            [{ each: undefined, allow_invalid: true, inclusive: true, granularity: undefined }],
            [{ each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object in the past or today': [
            [{ each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [{ each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    const mockedPastDayjs = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/dayjs/past-dayjs/past-dayjs.predicate.ts', {
        namedExports: {
            pastDayjs: mockedPastDayjs,
        },
    })
    const { PastDayjs: Decorator, PAST_DAYJS: SYMBOL } =
        require('../../../src/dayjs/past-dayjs/past-dayjs.decorator') as {
            PastDayjs: typeof PastDayjs
            PAST_DAYJS: typeof PAST_DAYJS
        }

    afterEach(() => mockedPastDayjs.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))(
                'when called with options %j',
                options => {
                    class TestClass {
                        @Decorator(...options)
                        property: unknown = value
                    }

                    expectValidationError(new TestClass(), {
                        property: 'property',
                        constraint: SYMBOL,
                        message,
                    })
                    assert.equal(mockedPastDayjs.mock.callCount(), 1)
                    assert.deepEqual(mockedPastDayjs.mock.calls[0].arguments, [
                        value,
                        {
                            allow_invalid: options[0]?.allow_invalid,
                            inclusive: options[0]?.inclusive,
                            granularity: options[0]?.granularity,
                        },
                    ])
                },
            )
        })
    }
})
