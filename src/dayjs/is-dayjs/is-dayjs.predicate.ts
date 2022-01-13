import type { Dayjs } from 'dayjs'
import { isDayjs as isDayjsNative } from 'dayjs'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options (see {@link IsDayjs}).
 */
export function isDayjs(value: unknown, options?: { allow_invalid?: boolean }): value is Dayjs {
    const { allow_invalid } = { allow_invalid: false, ...options }

    return isDayjsNative(value) && (allow_invalid || (value as Dayjs).isValid())
}
