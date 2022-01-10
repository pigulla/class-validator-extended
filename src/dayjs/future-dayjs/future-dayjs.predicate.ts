import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function futureDayjs(value: unknown): value is Dayjs {
    return isDayjs(value, { is_valid: true }) && value.isAfter(dayjs())
}
