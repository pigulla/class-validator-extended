import dayjs, {Dayjs} from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function minDayjs(value: unknown, min: Date | Dayjs): boolean {
    const minimum = dayjs(min)

    if (!minimum.isValid()) {
        throw new TypeError(`Parameter must be a valid Date or Dayjs instance`)
    }

    return isDayjs(value, {is_valid: true}) && value.isAfter(minimum)
}
