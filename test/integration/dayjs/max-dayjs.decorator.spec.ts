import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import dayjs from 'dayjs'

import type { MAX_DAYJS, MaxDayjs } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MaxDayjs', () => {
    type Options = Parameters<typeof MaxDayjs>

    const maximum = dayjs('2021-01-01T00:00:00.000Z')
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [maximum, undefined],
            [maximum, {}],
            [
                maximum,
                {
                    each: undefined,
                    allow_invalid: undefined,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [
                maximum,
                {
                    each: undefined,
                    allow_invalid: false,
                    inclusive: undefined,
                    granularity: 'minutes',
                },
            ],
            [
                maximum,
                {
                    each: undefined,
                    allow_invalid: undefined,
                    inclusive: false,
                    granularity: undefined,
                },
            ],
            [
                maximum,
                { each: undefined, allow_invalid: false, inclusive: false, granularity: 'minutes' },
            ],
            [
                maximum,
                {
                    each: false,
                    allow_invalid: undefined,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [
                maximum,
                { each: false, allow_invalid: false, inclusive: undefined, granularity: 'minutes' },
            ],
            [
                maximum,
                { each: false, allow_invalid: undefined, inclusive: false, granularity: undefined },
            ],
            [
                maximum,
                { each: false, allow_invalid: false, inclusive: false, granularity: 'minutes' },
            ],
        ],
        'each value in property must be a valid Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [
                maximum,
                {
                    each: true,
                    allow_invalid: undefined,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [
                maximum,
                { each: true, allow_invalid: false, inclusive: undefined, granularity: 'minutes' },
            ],
            [
                maximum,
                { each: true, allow_invalid: undefined, inclusive: false, granularity: undefined },
            ],
            [
                maximum,
                { each: true, allow_invalid: false, inclusive: false, granularity: 'minutes' },
            ],
        ],
        'property must be a Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [
                maximum,
                {
                    each: undefined,
                    allow_invalid: true,
                    inclusive: undefined,
                    granularity: undefined,
                },
            ],
            [
                maximum,
                {
                    each: undefined,
                    allow_invalid: true,
                    inclusive: undefined,
                    granularity: 'minutes',
                },
            ],
            [
                maximum,
                { each: undefined, allow_invalid: true, inclusive: false, granularity: undefined },
            ],
            [
                maximum,
                { each: undefined, allow_invalid: true, inclusive: false, granularity: 'minutes' },
            ],
        ],
        'each value in property must be a Dayjs object not after 2021-01-01T00:00:00.000Z': [
            [
                maximum,
                { each: true, allow_invalid: true, inclusive: undefined, granularity: undefined },
            ],
            [
                maximum,
                { each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' },
            ],
        ],
        'property must be a Dayjs object not after or on 2021-01-01T00:00:00.000Z': [
            [
                maximum,
                { each: undefined, allow_invalid: true, inclusive: true, granularity: undefined },
            ],
            [
                maximum,
                { each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' },
            ],
        ],
        'each value in property must be a Dayjs object not after or on 2021-01-01T00:00:00.000Z': [
            [maximum, { each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [maximum, { each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    const mockedMaxDayjs = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/dayjs/max-dayjs/max-dayjs.predicate.ts', {
        namedExports: {
            maxDayjs: mockedMaxDayjs,
        },
    })
    const { MaxDayjs: Decorator, MAX_DAYJS: SYMBOL } =
        require('../../../src/dayjs/max-dayjs/max-dayjs.decorator') as {
            MaxDayjs: typeof MaxDayjs
            MAX_DAYJS: typeof MAX_DAYJS
        }

    afterEach(() => mockedMaxDayjs.mock.resetCalls())
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
                    assert.equal(mockedMaxDayjs.mock.callCount(), 1)
                    assert.deepEqual(mockedMaxDayjs.mock.calls[0].arguments, [
                        value,
                        options[0],
                        {
                            allow_invalid: options[1]?.allow_invalid,
                            inclusive: options[1]?.inclusive,
                            granularity: options[1]?.granularity,
                        },
                    ])
                },
            )
        })
    }
})
