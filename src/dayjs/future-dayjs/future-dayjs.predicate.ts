import dayjs from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function futureDayjs(value: unknown): boolean {
    return isDayjs(value, {is_valid: true}) && value.isAfter(dayjs())
}
