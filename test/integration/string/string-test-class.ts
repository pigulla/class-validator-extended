import { IsTimezone, IsAwsRegion } from '~'

export class StringTestClass {
    @IsTimezone()
    isTimezone: unknown = 'Europe/Berlin'

    @IsTimezone({ each: true })
    eachIsTimezone: unknown = ['Europe/Berlin', 'europe/berlin', 'utc']

    @IsAwsRegion()
    isAwsRegion: unknown = 'eu-central-1'

    @IsAwsRegion({ each: true })
    eachIsAwsRegion: unknown = ['eu-central-1']

    constructor(fields: Partial<StringTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof StringTestClass] = v
        }
    }
}
