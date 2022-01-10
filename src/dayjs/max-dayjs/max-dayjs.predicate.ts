import type { ConfigType, Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../../type/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum allowed value.
 */
export function maxDayjs(value: unknown, maximum: ConfigType): value is Dayjs {
    const max = dayjs(maximum)

    if (!max.isValid()) {
        throw new TypeError(`Parameter "maximum" must be a valid date`)
    }

    // Let's not rely on the isSameOrBefore-plugin which might or might not be registered.
    return isDayjs(value, { is_valid: true }) && !(max.isBefore(value) || max.isSame(value))
}
