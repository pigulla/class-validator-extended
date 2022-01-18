import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

import { isValidDuration } from '../is-valid-duration'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options (see {@link IsDuration}).
 */
export function isDuration(value: unknown, options?: { allow_invalid?: boolean }): value is Duration {
    if (!('isDuration' in dayjs)) {
        throw new Error('The Dayjs "duration" plugin is not loaded.')
    }

    return dayjs.isDuration(value) && (options?.allow_invalid || isValidDuration(value as Duration))
}
