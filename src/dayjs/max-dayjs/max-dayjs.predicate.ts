import dayjs, {ConfigType, Dayjs} from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function maxDayjs(value: unknown, max: ConfigType): value is Dayjs {
    const maximum = dayjs(max)

    if (!maximum.isValid()) {
        throw new TypeError(`Parameter must be a valid date`)
    }

    return isDayjs(value, {is_valid: true}) && value.isBefore(maximum)
}
