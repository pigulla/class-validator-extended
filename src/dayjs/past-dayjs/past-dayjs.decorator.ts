import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import type { OpUnitType } from 'dayjs'

import { pastDayjs } from './past-dayjs.predicate'

function message(options?: { allow_invalid?: boolean; inclusive?: boolean }): string {
    return `${options?.allow_invalid ? 'a' : 'a valid'} Dayjs object ${
        options?.inclusive ? 'in the past or today' : 'in the past'
    }`
}

/** @hidden */
export const PAST_DAYJS = 'pastDayjs'

/**
 * Checks if the given value is a valid Dayjs object in the past.
 *
 * Beware that the behaviour of this check depends on the current time and can thus be difficult to test.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is in the past.
 * @PastDayjs()
 * created: Dayjs
 * ```
 *
 * @category Dayjs
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allow the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 *   - `inclusive: boolean = false`
 *     If true, allow the current date as well.
 *   - `granularity: string = 'milliseconds'`
 *     Defines the [granularity](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units), e.g. "day"
 *     to ignore hours, minutes, seconds and milliseconds.
 */
export function PastDayjs(
    options?: {
        allow_invalid?: boolean
        inclusive?: boolean
        granularity?: OpUnitType
    } & ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: PAST_DAYJS,
            validator: {
                validate: (value, _arguments): boolean =>
                    pastDayjs(value, {
                        allow_invalid: options?.allow_invalid,
                        inclusive: options?.inclusive,
                        granularity: options?.granularity,
                    }),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be ${message(options)}`,
                    options,
                ),
            },
        },
        options,
    )
}
