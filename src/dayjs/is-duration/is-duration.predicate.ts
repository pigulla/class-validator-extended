import dayjs from 'dayjs'
import type { Duration } from 'dayjs/plugin/duration'

export function isDuration(input: unknown): input is Duration {
    if (!('isDuration' in dayjs)) {
        throw new Error('The Dayjs "duration" plugin is not loaded.')
    }

    return dayjs.isDuration(input) && !Number.isNaN((input as Duration).asMilliseconds())
}
