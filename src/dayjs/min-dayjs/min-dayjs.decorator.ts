import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'

import { minDayjs } from './min-dayjs.predicate'

/** @hidden */
export const MIN_DAYJS = 'minDayjs'

/**
 * Checks if the given value is a valid Dayjs object not earlier than `minimum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is after the infamous Y2K.
 * @MinDayjs('2000-01-01T00:00:00.000Z')
 * y2kUnsafeDate: Dayjs
 * ```
 *
 * @category Dayjs
 * @param minimum The minimum allowed value.
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allows the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 *   - `inclusive: boolean = false`
 *     If true, allows the `maximum` date as well.
 */
export function MinDayjs(
    minimum: ConfigType,
    options?: { allow_invalid?: boolean; inclusive?: boolean } & ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => minDayjs(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${
                            options?.allow_invalid ? 'a' : 'a valid'
                        } Dayjs object not before ${dayjs(minimum).toISOString()}`,
                    options
                ),
            },
        },
        options
    )
}
