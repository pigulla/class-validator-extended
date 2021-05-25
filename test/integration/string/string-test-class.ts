import {IsTimezone} from '../../../src'

export class StringTestClass {
    @IsTimezone()
    isTimezone: unknown = 'Europe/Berlin'

    @IsTimezone({each: true})
    eachIsTimezone: unknown = ['Europe/Berlin', 'europe/berlin', 'utc']

    constructor(fields: Partial<StringTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            if (Object.prototype.hasOwnProperty.call(this, k)) {
                this[k as keyof StringTestClass] = v
            }
        }
    }
}
