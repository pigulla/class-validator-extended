import dayjs from 'dayjs'

import { FutureDayjs, IsDayjs, IsDuration, MaxDayjs, MinDayjs, PastDayjs } from '~'

export class DayjsTestClass {
    @IsDayjs()
    isDayjs: unknown = dayjs()

    @IsDayjs({ each: true })
    eachIsDayjs: unknown = [dayjs(), dayjs()]

    @IsDayjs({ is_valid: false })
    isDayjsInvalid: unknown = dayjs('2020-05-42T00:00:00.000Z')

    @IsDayjs({ is_valid: false, each: true })
    eachIsDayjsInvalid: unknown = [dayjs('2020-05-42T00:00:00.000Z'), dayjs()]

    @IsDuration()
    isDuration: unknown = dayjs.duration(3_600)

    @IsDuration({ each: true })
    eachIsDuration: unknown = [dayjs.duration(42, 'minutes'), dayjs.duration(3_600)]

    @MaxDayjs('2021-01-01T00:00:00.000Z')
    maxDayjs: unknown = dayjs('2020-12-31T23:59:59.999Z')

    @MaxDayjs('2021-01-01T00:00:00.000Z', { each: true })
    eachMaxDayjs: unknown = [
        dayjs('2020-12-01T00:00:00.000Z'),
        dayjs('2020-12-24T12:00:00.000Z'),
        dayjs('2020-12-31T23:59:59.999Z'),
    ]

    @MinDayjs('2021-01-01T00:00:00.000Z')
    minDayjs: unknown = dayjs('2021-01-01T00:00:00.001Z')

    @MinDayjs('2021-01-01T00:00:00.000Z', { each: true })
    eachMinDayjs: unknown = [
        dayjs('2021-01-01T00:01:00.000Z'),
        dayjs('2021-01-01T00:02:00.000Z'),
        dayjs('2021-01-01T00:03:00.000Z'),
    ]

    @FutureDayjs()
    futureDayjs: unknown = dayjs().add(1, 'minute')

    @FutureDayjs({ each: true })
    eachFutureDayjs: unknown = [dayjs().add(1, 'hour'), dayjs().add(1, 'day')]

    @PastDayjs()
    pastDayjs: unknown = dayjs().subtract(1, 'hour')

    @PastDayjs({ each: true })
    eachPastDayjs: unknown = [dayjs().subtract(1, 'hour'), dayjs().subtract(1, 'day')]

    constructor(fields: Partial<DayjsTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof DayjsTestClass] = v
        }
    }
}
