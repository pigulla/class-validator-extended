import dayjs, {Dayjs} from 'dayjs'

import {IsDayjsOptions} from './is-dayjs.options'

export function isDayjs(input: unknown, options: IsDayjsOptions): boolean {
    return dayjs.isDayjs(input) && (!options.is_valid || (input as Dayjs).isValid())
}
