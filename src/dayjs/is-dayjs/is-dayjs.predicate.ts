import dayjs, {Dayjs} from 'dayjs'

import {IsDayjsOptions} from './is-dayjs.options'

export function isDayjs(value: unknown, options: IsDayjsOptions): value is Dayjs {
    return dayjs.isDayjs(value) && (!options.is_valid || (value as Dayjs).isValid())
}
