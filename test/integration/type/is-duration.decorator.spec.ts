import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { IS_DURATION, IsDuration } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsDuration', () => {
    type Options = Parameters<typeof IsDuration>

    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs duration': [
            [],
            [{}],
            [{ each: undefined }],
            [{ each: false }],
        ],
        'each value in property must be a valid Dayjs duration': [[{ each: true }]],
        'property must be a Dayjs duration': [
            [{ allow_invalid: true }],
            [{ allow_invalid: true, each: undefined }],
            [{ allow_invalid: true, each: false }],
        ],
        'each value in property must be a Dayjs duration': [[{ allow_invalid: true, each: true }]],
    }

    const mockedIsDuration = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/type/is-duration/is-duration.predicate.ts', {
        namedExports: {
            isDuration: mockedIsDuration,
        },
    })
    const { IsDuration: Decorator, IS_DURATION: SYMBOL } =
        require('../../../src/type/is-duration/is-duration.decorator') as {
            IsDuration: typeof IsDuration
            IS_DURATION: typeof IS_DURATION
        }

    afterEach(() => mockedIsDuration.mock.resetCalls())
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
                    assert.equal(mockedIsDuration.mock.callCount(), 1)
                    assert.deepEqual(mockedIsDuration.mock.calls[0].arguments, [
                        value,
                        { allow_invalid: options[0]?.allow_invalid },
                    ])
                },
            )
        })
    }
})
