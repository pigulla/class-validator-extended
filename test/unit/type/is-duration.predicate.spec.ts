import 'jest-extended'

import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

import { isDuration } from '~'
import { withoutDurationPlugin } from '~test/without-duration-plugin'

describe('isDuration', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const invalidDuration = dayjs.duration('fourtytwo', 'minutes')

    describe('with default options', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs('2020-07-20T08:12:58.536Z')],
            ['foo'],
            [invalidDuration],
        ])('should be false for %p', (value: unknown) => {
            expect(isDuration(value)).toBeFalse()
        })

        it.each<[Duration]>([
            [dayjs.duration(42, 'minutes')],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [dayjs.duration()],
        ])('should be %p true for %p', value => {
            expect(isDuration(value)).toBeTrue()
        })
    })

    describe('with allow_invalid set to false', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs('2020-07-20T08:12:58.536Z')],
            ['foo'],
            [invalidDuration],
        ])('should be false for %p', (value: unknown) => {
            expect(isDuration(value, { allow_invalid: false })).toBeFalse()
        })

        it.each<[Duration]>([
            [dayjs.duration(42, 'minutes')],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [dayjs.duration()],
        ])('should be %p true for %p', value => {
            expect(isDuration(value, { allow_invalid: false })).toBeTrue()
        })
    })

    describe('with allow_invalid set to true', () => {
        it.each<[unknown]>([
            [undefined],
            [null],
            [0],
            ['0'],
            [new Date('2020-07-20T08:12:58.536Z')],
            [dayjs('2020-07-20T08:12:58.536Z')],
            ['foo'],
        ])('should be false for %p', (value: unknown) => {
            expect(isDuration(value, { allow_invalid: true })).toBeFalse()
        })

        it.each<[Duration]>([
            [dayjs.duration(42, 'minutes')],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [dayjs.duration()],
            [invalidDuration],
        ])('should be %p true for %p', value => {
            expect(isDuration(value, { allow_invalid: true })).toBeTrue()
        })
    })

    describe('when run without the duration plugin', () => {
        const { setup, restore } = withoutDurationPlugin()

        beforeEach(setup)
        afterEach(restore)

        it('should throw', () => {
            expect(() => isDuration(42)).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
