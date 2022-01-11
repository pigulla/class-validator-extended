import 'jest-extended'

import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

import { isDuration } from '~'

describe('isDuration', () => {
    it.each<[unknown]>([
        [undefined],
        [null],
        [0],
        ['0'],
        [new Date('2020-07-20T08:12:58.536Z')],
        [dayjs('2020-07-20T08:12:58.536Z')],
        ['foo'],
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

    describe('when run without the Duration plugin', () => {
        let originalIsDuration: typeof dayjs.isDuration

        /* eslint-disable @typescript-eslint/ban-ts-comment */
        beforeEach(() => {
            originalIsDuration = dayjs.isDuration

            // @ts-ignore
            delete dayjs.isDuration
        })

        afterEach(() => {
            // @ts-ignore
            dayjs.isDuration = originalIsDuration
        })
        /* eslint-enable @typescript-eslint/ban-ts-comment */

        it('should throw', () => {
            expect(() => isDuration(42)).toThrow('The Dayjs "duration" plugin is not loaded.')
        })
    })
})
