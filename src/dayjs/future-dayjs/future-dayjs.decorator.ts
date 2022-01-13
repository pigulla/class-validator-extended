import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { futureDayjs } from './future-dayjs.predicate'

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
 *     If true, allows the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 */
export function FutureDayjs(options?: { allow_invalid?: boolean } & ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: FUTURE_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => futureDayjs(value),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${
                            options?.allow_invalid ? 'a' : 'a valid'
                        } Dayjs object in the future`,
                    options
                ),
            },
        },
        options
    )
}
