import type { Dayjs, OpUnitType } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../../type/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options (see {@link FutureDayjs}).
 */
export function futureDayjs(
    value: unknown,
    options?: { allow_invalid?: boolean; inclusive?: boolean; granularity?: OpUnitType },
): value is Dayjs {
    const now = dayjs()
    const inclusive = options?.inclusive ?? false
    const granularity = options?.granularity ?? 'milliseconds'

    // Let's not rely on the isSameOrBefore-plugin which might or might not be registered.
    return (
        isDayjs(value, options) &&
        (value.isAfter(now, granularity) || (inclusive && value.isSame(now, granularity)))
    )
}
