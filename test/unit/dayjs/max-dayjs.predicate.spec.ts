import 'jest-extended'

import dayjs = require('dayjs')
import {Dayjs} from 'dayjs'

import {maxDayjs} from '../../../src'

describe('maxDayjs', () => {
    const max = dayjs('2020-05-01T06:00:00.000Z')

    it.each<[unknown]>([[dayjs('2020-05-01T99:00:00.000Z')], [null], ['']])(
        'should throw for %p as a maxValue',
        maxValue => {
            expect(() => maxDayjs(max, maxValue as Dayjs)).toThrow(TypeError)
        }
    )

    it.each<[unknown]>([[max.subtract(1, 'millisecond')], [max]])('should be true for %p', value => {
        expect(maxDayjs(value, max)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [max.add(1, 'minute')], [max.toDate()]])(
        'should be false for %p',
        value => {
            expect(maxDayjs(value, max)).toBeFalse()
        }
    )
})
