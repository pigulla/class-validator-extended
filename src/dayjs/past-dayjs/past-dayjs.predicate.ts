import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../../dayjs/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options (see {@link PastDayjs}).
 */
export function pastDayjs(value: unknown, options: { allow_invalid?: boolean } = {}): value is Dayjs {
    return isDayjs(value, options) && value.isBefore(dayjs())
}
