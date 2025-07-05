import type { Duration, DurationUnitsObjectType, DurationUnitType } from 'dayjs/plugin/duration'

import { isDuration } from '../../type/is-duration'
import { createDuration } from '../create-duration'
import { isValidDuration } from '../is-valid-duration'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param maximum The maximum allowed duration.
 * @param options Additional options (see {@link MaxDuration}).
 */
export function maxDuration(
    value: unknown,
    maximum: Duration | string | DurationUnitsObjectType | [time: number, unit?: DurationUnitType],
    options?: { inclusive?: boolean },
): value is Duration {
    const max = createDuration(maximum)

    if (!isValidDuration(max)) {
        throw new TypeError('Parameter "maximum" must be a valid Dayjs duration')
    }

    const inclusive = options?.inclusive ?? false

    return (
        isDuration(value) &&
        (inclusive
            ? value.asMilliseconds() <= max.asMilliseconds()
            : value.asMilliseconds() < max.asMilliseconds())
    )
}
