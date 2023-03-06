import 'jest-extended'

import dayjs from 'dayjs'

import { maxDuration } from '~'
import { withoutDurationPlugin } from '~test/without-duration-plugin'

describe('maxDuration', () => {
    const maximum = dayjs.duration(1, 'hour')
    const invalidDurationObjects: [string, unknown][] = [['an invalid duration', dayjs.duration('PxD')]]

    it('should throw if "maximum" is an invalid duration object', () => {
        expect(() => maxDuration(dayjs.duration(1, 'hour'), dayjs.duration('PxD'))).toThrow(TypeError)
    })

    describe('with default options', () => {
        it.each<[string, unknown]>([
            ...invalidDurationObjects,
            ['a longer duration', maximum.add(5, 'minutes')],
            ['the maximum value itself', maximum],
        ])('should be false for %s', (_, value) => {
            expect(maxDuration(value, maximum)).toBeFalse()
        })

        it.each<[string, unknown]>([['a shorter duration', maximum.subtract(5, 'minutes')]])(
            'should be true for %s',
            (_, value) => {
                expect(maxDuration(value, maximum)).toBeTrue()
            }
        )

        describe('and "inclusive" set to true', () => {
            it.each<[string, unknown]>([...invalidDurationObjects, ['a longer duration', maximum.add(5, 'minutes')]])(
                'should be false for %s',
                (_, value) => {
                    expect(maxDuration(value, maximum, { inclusive: true })).toBeFalse()
                }
            )

            it.each<[string, unknown]>([
                ['the maximum value itself', maximum],
                ['a shorter duration', maximum.subtract(5, 'minutes')],
            ])('should be true for %s', (_, value) => {
                expect(maxDuration(value, maximum, { inclusive: true })).toBeTrue()
            })
        })
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            expect(() => maxDuration(42, maximum)).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
