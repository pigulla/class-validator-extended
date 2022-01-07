import 'jest-extended'

import dayjs = require('dayjs')
import { Dayjs } from 'dayjs'

import { minDayjs } from '~'

describe('minDayjs', () => {
    const min = dayjs('2020-05-01T06:00:00.000Z')

    it.each<[unknown]>([[dayjs('2020-05-01T99:00:00.000Z')], [null], ['']])(
        'should throw for %p as a minValue',
        minValue => {
            expect(() => minDayjs(min, minValue as Dayjs)).toThrow(TypeError)
        }
    )

    it.each<[unknown]>([[min.add(1, 'millisecond')]])('should be true for %p', value => {
        expect(minDayjs(value, min)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [min], [min.subtract(1, 'minute')], [min.toDate()]])(
        'should be false for %p',
        value => {
            expect(minDayjs(value, min)).toBeFalse()
        }
    )
})
