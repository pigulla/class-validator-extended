import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { pastDayjs } from './past-dayjs.predicate'

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
 *     If true, allows the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 */
export function PastDayjs(options?: { allow_invalid?: boolean } & ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: PAST_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => pastDayjs(value),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${
                            options?.allow_invalid ? 'a' : 'a valid'
                        } Dayjs object in the past`,
                    options
                ),
            },
        },
        options
    )
}
