import type { ConfigType, Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param minimum The minimum allowed value.
 */
export function minDayjs(value: unknown, minimum: ConfigType): value is Dayjs {
    const min = dayjs(minimum)

    if (!min.isValid()) {
        throw new TypeError(`Parameter "minimum" must be a valid date`)
    }

    // Let's not rely on the isSameOrBefore-plugin which might or might not be registered.
    return isDayjs(value, { is_valid: true }) && !(min.isAfter(value) || min.isSame(value))
}
