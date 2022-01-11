import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isDuration(value: unknown): value is Duration {
    if (!('isDuration' in dayjs)) {
        throw new Error('The Dayjs "duration" plugin is not loaded.')
    }

    return dayjs.isDuration(value) && !Number.isNaN((value as Duration).asMilliseconds())
}
