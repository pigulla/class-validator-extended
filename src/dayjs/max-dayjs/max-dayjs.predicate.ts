import dayjs from 'dayjs'
import type { ConfigType, Dayjs, OpUnitType } from 'dayjs'

import { isDayjs } from '../../type/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum allowed value.
 * @param options Additional options (see {@link MaxDayjs}).
 */
export function maxDayjs(
    value: unknown,
    maximum: ConfigType,
    options?: { allow_invalid?: boolean; inclusive?: boolean; granularity?: OpUnitType },
): value is Dayjs {
    const max = dayjs(maximum)
    const inclusive = options?.inclusive ?? false
    const granularity = options?.granularity ?? 'milliseconds'

    if (!max.isValid()) {
        throw new TypeError(`Parameter "maximum" must be a valid date`)
    }

    // Let's not rely on the isSameOrBefore-plugin which might or might not be registered.
    return (
        isDayjs(value, options) &&
        (max.isAfter(value, granularity) || (inclusive && max.isSame(value, granularity)))
    )
}
