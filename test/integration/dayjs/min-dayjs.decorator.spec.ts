import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import dayjs from 'dayjs'

import type { MIN_DAYJS, MinDayjs } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MinDayjs', () => {
    type Options = Parameters<typeof MinDayjs>

    const minimum = dayjs('2021-01-01T00:00:00.000Z')
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, undefined],
            [minimum, {}],
            [minimum, { each: undefined, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: undefined, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
            [minimum, { each: false, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [minimum, { each: false, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: false, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [minimum, { each: false, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a valid Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, { each: true, allow_invalid: undefined, inclusive: undefined, granularity: undefined }],
            [minimum, { each: true, allow_invalid: false, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: true, allow_invalid: undefined, inclusive: false, granularity: undefined }],
            [minimum, { each: true, allow_invalid: false, inclusive: false, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, { each: undefined, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: false, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: false, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object not before 2021-01-01T00:00:00.000Z': [
            [minimum, { each: true, allow_invalid: true, inclusive: undefined, granularity: undefined }],
            [minimum, { each: true, allow_invalid: true, inclusive: undefined, granularity: 'minutes' }],
        ],
        'property must be a Dayjs object not before or on 2021-01-01T00:00:00.000Z': [
            [minimum, { each: undefined, allow_invalid: true, inclusive: true, granularity: undefined }],
            [minimum, { each: undefined, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
        'each value in property must be a Dayjs object not before or on 2021-01-01T00:00:00.000Z': [
            [minimum, { each: true, allow_invalid: true, inclusive: true, granularity: undefined }],
            [minimum, { each: true, allow_invalid: true, inclusive: true, granularity: 'minutes' }],
        ],
    }

    const mockedMinDayjs = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/dayjs/min-dayjs/min-dayjs.predicate.ts', {
        namedExports: {
            minDayjs: mockedMinDayjs,
        },
    })
    const { MinDayjs: Decorator, MIN_DAYJS: SYMBOL } = require('../../../src/dayjs/min-dayjs/min-dayjs.decorator') as {
        MinDayjs: typeof MinDayjs
        MIN_DAYJS: typeof MIN_DAYJS
    }

    afterEach(() => mockedMinDayjs.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @Decorator(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SYMBOL,
                    message,
                })
                assert.equal(mockedMinDayjs.mock.callCount(), 1)
                assert.deepEqual(mockedMinDayjs.mock.calls[0].arguments, [
                    value,
                    options[0],
                    {
                        allow_invalid: options[1]?.allow_invalid,
                        inclusive: options[1]?.inclusive,
                        granularity: options[1]?.granularity,
                    },
                ])
            })
        })
    }
})
