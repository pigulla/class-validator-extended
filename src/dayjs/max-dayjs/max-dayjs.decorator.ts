import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'

import { maxDayjs } from './max-dayjs.predicate'

/** @hidden */
export const MAX_DAYJS = 'maxDayjs'

/**
 * Checks if the given value is a valid Dayjs object not later than `maximum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is before the infamous Y2K.
 * @MaxDayjs('2000-01-01T00:00:00.000Z')
 * y2kSafeDate: Dayjs
 * ```
 *
 * @category Dayjs
 * @param maximum The maximum allowed value.
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allows the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 *   - `inclusive: boolean = false`
 *     If true, allows the `maximum` date as well.
 */
export function MaxDayjs(
    maximum: ConfigType,
    options?: { allow_invalid?: boolean; inclusive?: boolean } & ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => maxDayjs(value, maximum, options),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${
                            options?.allow_invalid ? 'a' : 'a valid'
                        } Dayjs object not after ${dayjs(maximum).toISOString()}`,
                    options
                ),
            },
        },
        options
    )
}
