import { FutureDate, PastDate } from '~'

export class DateTestClass {
    @FutureDate()
    futureDate: unknown = new Date(Date.now() + 60 * 60 * 1_000)

    @FutureDate({ each: true })
    eachFutureDate: unknown = [new Date(Date.now() + 60 * 60 * 1_000), new Date(Date.now() + 30 * 60 * 1_000)]

    @PastDate()
    pastDate: unknown = new Date(Date.now() - 60 * 60 * 1_000)

    @PastDate({ each: true })
    eachPastDate: unknown = [new Date(Date.now() - 60 * 60 * 1_000), new Date(Date.now() - 30 * 60 * 1_000)]

    constructor(fields: Partial<DateTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof DateTestClass] = v
        }
    }
}
