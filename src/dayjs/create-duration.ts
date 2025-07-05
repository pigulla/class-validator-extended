import dayjs from 'dayjs'
import type { Duration, DurationUnitsObjectType, DurationUnitType } from 'dayjs/plugin/duration'

/** @hidden */
export function createDuration(
    value: Duration | string | DurationUnitsObjectType | [time: number, unit?: DurationUnitType],
): Duration {
    if (!('isDuration' in dayjs)) {
        throw new Error('The Dayjs "duration" plugin is not loaded.')
    }

    if (dayjs.isDuration(value)) {
        return value
    }
    if (Array.isArray(value)) {
        return dayjs.duration(...value)
    }
    if (typeof value === 'string') {
        return dayjs.duration(value)
    }

    return dayjs.duration(value)
}
