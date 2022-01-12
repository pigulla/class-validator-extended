import { IsTimezone, IsAwsRegion, IsAwsARN } from '~'

export class StringTestClass {
    @IsTimezone()
    isTimezone: unknown = 'Europe/Berlin'

    @IsTimezone({ each: true })
    eachIsTimezone: unknown = ['Europe/Berlin', 'europe/berlin', 'utc']

    @IsAwsRegion()
    isAwsRegion: unknown = 'eu-central-1'

    @IsAwsRegion({ each: true })
    eachIsAwsRegion: unknown = ['eu-central-1']

    @IsAwsARN()
    isAwsARN: unknown = 'arn:aws:clouddirectory:us-west-2:123456789012:schema/development/cognito'

    @IsAwsARN({ each: true })
    eachIsAwsARN: unknown = ['arn:aws:clouddirectory:us-west-2:123456789012:schema/development/cognito']

    constructor(fields: Partial<StringTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof StringTestClass] = v
        }
    }
}
