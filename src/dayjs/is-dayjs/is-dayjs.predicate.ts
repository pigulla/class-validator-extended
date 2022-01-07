import dayjs, { Dayjs } from 'dayjs'

import { IsDayjsOptions } from './is-dayjs.options'

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options.
 */
export function isDayjs(value: unknown, options: IsDayjsOptions): value is Dayjs {
    return dayjs.isDayjs(value) && (!options.is_valid || (value as Dayjs).isValid())
}
