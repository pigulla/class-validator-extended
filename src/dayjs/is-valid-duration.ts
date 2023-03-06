import type { Duration } from 'dayjs/plugin/duration'

/** @hidden */
export function isValidDuration(duration: Duration): boolean {
    return !Number.isNaN(duration.asMilliseconds())
}
