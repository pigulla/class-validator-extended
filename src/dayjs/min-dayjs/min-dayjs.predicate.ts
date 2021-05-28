import dayjs, {ConfigType, Dayjs} from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function minDayjs(value: unknown, min: ConfigType): value is Dayjs {
    const minimum = dayjs(min)

    if (!minimum.isValid()) {
        throw new TypeError(`Parameter "min" must be a valid date`)
    }

    return isDayjs(value, {is_valid: true}) && !minimum.isAfter(value)
}
