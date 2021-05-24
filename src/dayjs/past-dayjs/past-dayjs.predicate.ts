import dayjs from 'dayjs'

import {isDayjs} from '../is-dayjs'

export function pastDayjs(value: unknown): boolean {
    return isDayjs(value, {is_valid: true}) && value.isBefore(dayjs())
}
