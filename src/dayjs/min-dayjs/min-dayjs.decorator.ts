import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import dayjs from 'dayjs'
import type { ConfigType, OpUnitType } from 'dayjs'

import { minDayjs } from './min-dayjs.predicate'

/** @hidden */
export const MIN_DAYJS = 'minDayjs'

function message(options?: { allow_invalid?: boolean; inclusive?: boolean }): string {
    return `${options?.allow_invalid ? 'a' : 'a valid'} Dayjs object not ${
        options?.inclusive ? 'before or on' : 'before'
    } $constraint1`
}

/**
 * Checks if the given value is a valid Dayjs object not earlier than `minimum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is after the infamous Y2K.
 * @MinDayjs('2000-01-01Z', { granularity: 'day', inclusive: true })
 * y2kUnsafeDate: Dayjs
 * ```
 *
 * @category Dayjs
 * @param minimum The minimum allowed value.
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allow the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 *   - `inclusive: boolean = false`
 *     If true, allow the `maximum` date as well.
 *  - `granularity: string = 'milliseconds'`
 *     Defines the [granularity](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units), e.g. "day"
 *     to ignore hours, minutes, seconds and milliseconds.
 */
export function MinDayjs(
    minimum: ConfigType,
    options?: { allow_invalid?: boolean; inclusive?: boolean; granularity?: OpUnitType } & ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_DAYJS,
            constraints: [dayjs(minimum).toISOString()],
            validator: {
                validate: (value, _arguments): boolean => minDayjs(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be ${message(options)}`,
                    options
                ),
            },
        },
        options
    )
}
