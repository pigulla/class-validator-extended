import 'jest-extended'
import dayjs from 'dayjs'

import { MIN_DURATION, MinDuration, minDuration } from '~'
import { expectValidationError } from '~test/util'
import { withoutDurationPlugin } from '~test/without-duration-plugin'

jest.mock('~/dayjs/min-duration/min-duration.predicate')

describe('@MinDuration', () => {
    const mockedMinDuration = minDuration as unknown as jest.Mock
    const minimum = dayjs.duration(1, 'hour')

    type Options = Parameters<typeof MinDuration>
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

    beforeEach(() => {
        mockedMinDuration.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @MinDuration(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: MIN_DURATION,
                    message,
                })
                expect(mockedMinDuration).toHaveBeenCalledWith(value, options[0], { inclusive: options[1]?.inclusive })
            })
        })
    }

    it('should throw if "minimum" is not a valid duration', () => {
        expect(() => MinDuration('PxD')).toThrow(TypeError)
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            expect(() => MinDuration('PT1H')).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
