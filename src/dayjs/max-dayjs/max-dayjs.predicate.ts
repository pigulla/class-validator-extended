import dayjs, {Dayjs} from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function maxDayjs(value: unknown, max: Date | Dayjs): boolean {
    const maximum = dayjs(max)

    if (!maximum.isValid()) {
        throw new TypeError(`Parameter must be a valid Date or Dayjs instance`)
    }

    return isDayjs(value, {is_valid: true}) && value.isAfter(maximum)
}
