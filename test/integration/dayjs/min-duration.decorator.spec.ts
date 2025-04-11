import assert from 'node:assert'
import { describe, after, mock, afterEach, beforeEach, it } from 'node:test'

import dayjs from 'dayjs'

import type { MIN_DURATION, MinDuration } from '../../../src'
import { expectValidationError, itEach } from '../../util'
import { withoutDurationPlugin } from '../../without-duration-plugin'

describe('@MinDuration', () => {
    type Options = Parameters<typeof MinDuration>

    const minimum = dayjs.duration(1, 'hour')
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs duration not shorter than PT1H': [
            [minimum],
            [minimum, {}],
            [minimum, { each: undefined, inclusive: undefined }],
            [minimum, { each: undefined, inclusive: false }],
            [minimum, { each: false, inclusive: undefined }],
            [minimum, { each: false, inclusive: false }],
        ],
        'each value in property must be a valid Dayjs duration not shorter than PT1H': [
            [minimum, { each: true, inclusive: undefined }],
            [minimum, { each: true, inclusive: false }],
        ],
        'property must be a valid Dayjs duration equal to or not shorter than PT1H': [
            [minimum, { each: undefined, inclusive: true }],
        ],
        'each value in property must be a valid Dayjs duration equal to or not shorter than PT1H': [
            [minimum, { each: true, inclusive: true }],
        ],
    }

    const mockedMinDuration = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/dayjs/min-duration/min-duration.predicate.ts', {
        namedExports: {
            minDuration: mockedMinDuration,
        },
    })
    const { MinDuration: Decorator, MIN_DURATION: SYMBOL } =
        require('../../../src/dayjs/min-duration/min-duration.decorator') as {
            MinDuration: typeof MinDuration
            MIN_DURATION: typeof MIN_DURATION
        }

    afterEach(() => mockedMinDuration.mock.resetCalls())
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
                assert.equal(mockedMinDuration.mock.callCount(), 1)
                assert.deepEqual(mockedMinDuration.mock.calls[0].arguments, [
                    value,
                    options[0],
                    { inclusive: options[1]?.inclusive },
                ])
            })
        })
    }

    it('should throw if "minimum" is not a valid duration', () => {
        assert.throws(() => Decorator('PxD'), TypeError)
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            assert.throws(() => Decorator('PT1H'), /The Dayjs "duration" plugin is not loaded/)
        })
    })
})
