import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import type { IsDayjs, IS_DAYJS } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsDayjs', () => {
    type Options = Parameters<typeof IsDayjs>

    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs object': [
            [],
            [{}],
            [{ each: undefined, allow_invalid: undefined }],
            [{ each: undefined, allow_invalid: false }],
            [{ each: false, allow_invalid: undefined }],
            [{ each: false, allow_invalid: false }],
        ],
        'each value in property must be a valid Dayjs object': [
            [{ each: true, allow_invalid: undefined }],
            [{ each: true, allow_invalid: false }],
        ],
        'property must be a Dayjs object': [
            [{ each: undefined, allow_invalid: true }],
            [{ each: false, allow_invalid: true }],
        ],
        'each value in property must be a Dayjs object': [[{ each: true, allow_invalid: true }]],
    }

    const mockedIsDayjs = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/type/is-dayjs/is-dayjs.predicate.ts', {
        namedExports: {
            isDayjs: mockedIsDayjs,
        },
    })
    const { IsDayjs: Decorator, IS_DAYJS: SYMBOL } = require('../../../src/type/is-dayjs/is-dayjs.decorator') as {
        IsDayjs: typeof IsDayjs
        IS_DAYJS: typeof IS_DAYJS
    }

    afterEach(() => mockedIsDayjs.mock.resetCalls())
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
                assert.equal(mockedIsDayjs.mock.callCount(), 1)
                assert.deepEqual(mockedIsDayjs.mock.calls[0].arguments, [
                    value,
                    { allow_invalid: options[0]?.allow_invalid },
                ])
            })
        })
    }
})
