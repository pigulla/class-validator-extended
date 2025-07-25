import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { ConfigType, OpUnitType } from 'dayjs'
import dayjs from 'dayjs'

import { maxDayjs } from './max-dayjs.predicate'

/** @hidden */
export const MAX_DAYJS = 'maxDayjs'

function message(options?: { allow_invalid?: boolean; inclusive?: boolean }): string {
    return `${options?.allow_invalid ? 'a' : 'a valid'} Dayjs object not ${
        options?.inclusive ? 'after or on' : 'after'
    } $constraint1`
}

/**
 * Checks if the given value is a valid Dayjs object not later than `maximum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is before the infamous Y2K.
 * @MaxDayjs('2000-01-01Z', { granularity: 'day' })
 * y2kSafeDate: Dayjs
 * ```
 *
 * @category Dayjs
 * @param maximum The maximum allowed value.
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allow the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 *   - `inclusive: boolean = false`
 *     If true, allow the `maximum` date as well.
 *   - `granularity: string = 'milliseconds'`
 *     Defines the [granularity](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units), e.g. "day"
 *     to ignore hours, minutes, seconds and milliseconds.
 */
export function MaxDayjs(
    maximum: ConfigType,
    options?: {
        allow_invalid?: boolean
        inclusive?: boolean
        granularity?: OpUnitType
    } & ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_DAYJS,
            constraints: [dayjs(maximum).toISOString()],
            validator: {
                validate: (value, _arguments): boolean =>
                    maxDayjs(value, maximum, {
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
