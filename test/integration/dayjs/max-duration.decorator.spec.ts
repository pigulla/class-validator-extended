import 'jest-extended'
import dayjs from 'dayjs'

import { MAX_DURATION, MaxDuration, maxDuration } from '~'
import { expectValidationError } from '~test/util'
import { withoutDurationPlugin } from '~test/without-duration-plugin'

jest.mock('~/dayjs/max-duration/max-duration.predicate')

describe('@MaxDuration', () => {
    const mockedMaxDuration = maxDuration as unknown as jest.Mock
    const maximum = dayjs.duration(1, 'hour')

    type Options = Parameters<typeof MaxDuration>
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

    beforeEach(() => {
        mockedMaxDuration.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MaxDuration(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MAX_DURATION,
                    message,
                })
                expect(mockedMaxDuration).toHaveBeenCalledWith(value, options[0], { inclusive: options[1]?.inclusive })
            })
        })
    }

    it('should throw if "maximum" is not a valid duration', () => {
        expect(() => MaxDuration('PxD')).toThrow(TypeError)
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            expect(() => MaxDuration('PT1H')).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
