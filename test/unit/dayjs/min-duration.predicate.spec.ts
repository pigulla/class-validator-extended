import 'jest-extended'

import dayjs from 'dayjs'

import { minDuration } from '~'
import { withoutDurationPlugin } from '~test/without-duration-plugin'

describe('minDuration', () => {
    const minimum = dayjs.duration(1, 'hour')
    const invalidDurationObjects: [string, unknown][] = [
        ['an invalid duration', dayjs.duration('PxD')],
        ['a negative duration', dayjs.duration(-5, 'hour')],
    ]

    it('should throw if "minimum" is an invalid duration object', () => {
        expect(() => minDuration(dayjs.duration(1, 'hour'), dayjs.duration('PxD'))).toThrow(TypeError)
    })

    describe('with default options', () => {
        it.each<[string, unknown]>([
            ...invalidDurationObjects,
            ['a shorter duration', minimum.subtract(5, 'minutes')],
            ['the minimum value itself', minimum],
        ])('should be false for %s', (_, value) => {
            expect(minDuration(value, minimum)).toBeFalse()
        })

        it.each<[string, unknown]>([['a longer duration', minimum.add(5, 'minutes')]])(
            'should be true for %s',
            (_, value) => {
                expect(minDuration(value, minimum)).toBeTrue()
            }
        )

        describe('and "inclusive" set to true', () => {
            it.each<[string, unknown]>([
                ...invalidDurationObjects,
                ['a shorter duration', minimum.subtract(5, 'minutes')],
            ])('should be false for %s', (_, value) => {
                expect(minDuration(value, minimum, { inclusive: true })).toBeFalse()
            })

            it.each<[string, unknown]>([
                ['the minimum value itself', minimum],
                ['a longer duration', minimum.add(5, 'minutes')],
            ])('should be true for %s', (_, value) => {
                expect(minDuration(value, minimum, { inclusive: true })).toBeTrue()
            })
        })
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            expect(() => minDuration(42, minimum)).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
