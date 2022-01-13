import type { ConfigType, Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { isDayjs } from '../../dayjs/is-dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum allowed value.
 * @param options Additional options (see {@link MaxDayjs}).
 */
export function maxDayjs(
    value: unknown,
    maximum: ConfigType,
    options: { allow_invalid?: boolean; inclusive?: boolean } = {}
): value is Dayjs {
    const max = dayjs(maximum)

    if (!max.isValid()) {
        throw new TypeError(`Parameter "maximum" must be a valid date`)
    }

    // Let's not rely on the isSameOrBefore-plugin which might or might not be registered.
    return isDayjs(value, options) && !(max.isBefore(value) || (options?.inclusive && max.isSame(value)))
}
