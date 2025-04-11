import assert from 'node:assert'
import { describe, after, mock, beforeEach, afterEach, it } from 'node:test'

import dayjs from 'dayjs'

import type { MAX_DURATION, MaxDuration } from '../../../src'
import { expectValidationError, itEach } from '../../util'
import { withoutDurationPlugin } from '../../without-duration-plugin'

describe('@MaxDuration', () => {
    type Options = Parameters<typeof MaxDuration>

    const maximum = dayjs.duration(1, 'hour')
    const matrix: Record<string, Options[]> = {
        'property must be a valid Dayjs duration not longer than PT1H': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined, inclusive: undefined }],
            [maximum, { each: undefined, inclusive: false }],
            [maximum, { each: false, inclusive: undefined }],
            [maximum, { each: false, inclusive: false }],
        ],
        'each value in property must be a valid Dayjs duration not longer than PT1H': [
            [maximum, { each: true, inclusive: undefined }],
            [maximum, { each: true, inclusive: false }],
        ],
        'property must be a valid Dayjs duration equal to or not longer than PT1H': [
            [maximum, { each: undefined, inclusive: true }],
        ],
        'each value in property must be a valid Dayjs duration equal to or not longer than PT1H': [
            [maximum, { each: true, inclusive: true }],
        ],
    }

    const mockedMaxDuration = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/dayjs/max-duration/max-duration.predicate.ts', {
        namedExports: {
            maxDuration: mockedMaxDuration,
        },
    })
    const { MaxDuration: Decorator, MAX_DURATION: SYMBOL } =
        require('../../../src/dayjs/max-duration/max-duration.decorator') as {
            MaxDuration: typeof MaxDuration
            MAX_DURATION: typeof MAX_DURATION
        }

    afterEach(() => mockedMaxDuration.mock.resetCalls())
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
                assert.equal(mockedMaxDuration.mock.callCount(), 1)
                assert.deepEqual(mockedMaxDuration.mock.calls[0].arguments, [
                    value,
                    options[0],
                    { inclusive: options[1]?.inclusive },
                ])
            })
        })
    }

    it('should throw if "maximum" is not a valid duration', () => {
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
