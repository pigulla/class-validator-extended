import dayjs, {Dayjs} from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function futureDayjs(value: unknown): value is Dayjs {
    return isDayjs(value, {is_valid: true}) && value.isAfter(dayjs())
}
