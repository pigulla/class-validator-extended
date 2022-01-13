import dayjs from 'dayjs'
import type { ConfigType, Dayjs, OpUnitType } from 'dayjs'

import { isDayjs } from '../../dayjs/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param minimum The minimum allowed value.
 * @param options Additional options (see {@link MinDays}).
 */
export function minDayjs(
    value: unknown,
    minimum: ConfigType,
    options?: { allow_invalid?: boolean; inclusive?: boolean; granularity?: OpUnitType }
): value is Dayjs {
    const min = dayjs(minimum)
    const inclusive = options?.inclusive ?? false
    const granularity = options?.granularity ?? 'milliseconds'

    if (!min.isValid()) {
        throw new TypeError(`Parameter "minimum" must be a valid date`)
    }

    // Let's not rely on the isSameOrBefore-plugin which might or might not be registered.
    return (
        isDayjs(value, options) && (min.isBefore(value, granularity) || (inclusive && min.isSame(value, granularity)))
    )
}
