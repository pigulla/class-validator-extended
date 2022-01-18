import type { Duration, DurationUnitsObjectType, DurationUnitType } from 'dayjs/plugin/duration'

import { isDuration } from '../../dayjs/is-duration'
import { createDuration } from '../create-duration'
import { isValidDuration } from '../is-valid-duration'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param minimum The minimum allowed duration.
 * @param options Additional options (see {@link MinDuration}).
 */
export function minDuration(
    value: unknown,
    minimum: Duration | string | DurationUnitsObjectType | [time: number, unit?: DurationUnitType],
    options?: { inclusive?: boolean }
): value is Duration {
    const min = createDuration(minimum)

    if (!isValidDuration(min)) {
        throw new TypeError('Parameter "minimum" must be a valid Dayjs duration')
    }

    const inclusive = options?.inclusive ?? false

    return (
        isDuration(value) &&
        (inclusive ? value.asMilliseconds() >= min.asMilliseconds() : value.asMilliseconds() > min.asMilliseconds())
    )
}
