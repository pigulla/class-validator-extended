import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { FUTURE_DAYJS, FutureDayjs } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@FutureDayjs', () => {
    type Options = Parameters<typeof FutureDayjs>

    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object in the future': [
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
        'each value in property must be a valid Dayjs object in the future': [
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
        'property must be a Dayjs object in the future': [
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
        'each value in property must be a Dayjs object in the future': [
            [{ each: true, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [{ each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object in the future or today': [
            [{ each: undefined, allow_invalid: true, inclusive: true, granularity: undefined }],
            [{ each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object in the future or today': [
            [{ each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [{ each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    const mockedFutureDayjs = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/dayjs/future-dayjs/future-dayjs.predicate.ts', {
        namedExports: {
            futureDayjs: mockedFutureDayjs,
        },
    })
    const { FutureDayjs: Decorator, FUTURE_DAYJS: SYMBOL } =
        require('../../../src/dayjs/future-dayjs/future-dayjs.decorator') as {
            FutureDayjs: typeof FutureDayjs
            FUTURE_DAYJS: typeof FUTURE_DAYJS
        }

    afterEach(() => mockedFutureDayjs.mock.resetCalls())
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
                    assert.equal(mockedFutureDayjs.mock.callCount(), 1)
                    assert.deepEqual(mockedFutureDayjs.mock.calls[0].arguments, [
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
