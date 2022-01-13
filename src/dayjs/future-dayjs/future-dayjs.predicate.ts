import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../../dayjs/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options (see {@link FutureDayjs}).
 */
export function futureDayjs(value: unknown, options: { allow_invalid?: boolean } = {}): value is Dayjs {
    return isDayjs(value, options) && value.isAfter(dayjs())
}
