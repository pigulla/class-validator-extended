import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { OpUnitType } from 'dayjs'

import { futureDayjs } from './future-dayjs.predicate'

function message(options?: { allow_invalid?: boolean; inclusive?: boolean }): string {
    return `${options?.allow_invalid ? 'a' : 'a valid'} Dayjs object ${
        options?.inclusive ? 'in the future or today' : 'in the future'
    }`
}

/** @hidden */
export const FUTURE_DAYJS = 'futureDayjs'

/**
 * Checks if the given value is a valid Dayjs object in the future.
 *
 * Beware that the behaviour of this check depends on the current time and can thus be difficult to test. In particular,
 * as time goes by the property can become invalid without ever changing its value.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is in the future.
 * @FutureDayjs()
 * scheduledFor: Dayjs
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
export function FutureDayjs(
    options?: {
        allow_invalid?: boolean
        inclusive?: boolean
        granularity?: OpUnitType
    } & ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: FUTURE_DAYJS,
            validator: {
                validate: (value, _arguments): boolean =>
                    futureDayjs(value, {
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
