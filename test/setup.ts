import { extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'

extend(duration)
extend(timezone)

// IntelliJ and Jest don't serialize BigInts properly which can cause tests to hang or emit unhelpful error messages.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BigInt.prototype.toJSON = function bigIntToJson() {
    return this.toString()
}
