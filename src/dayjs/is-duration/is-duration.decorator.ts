import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isDuration } from './is-duration.predicate'

/** @hidden */
export const IS_DURATION = 'isDuration'

/**
 * Checks if the given value is a valid Dayjs duration.
 *
 * A duration is considered valid if and only if:
 *   - it passes [dayjs.isDuration()](https://day.js.org/docs/en/durations/is-a-duration)
 *   - its numeric value is a finite number (i.e., `duration.asMilliseconds()` is not `NaN`)
 *
 * This requires the [duration-plugin](https://day.js.org/docs/en/plugin/duration) to be loaded. If this is not the
 * case, an error will be thrown.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a Dayjs duration.
 * @IsDuration()
 * value: Duration
 * ```
 *
 * @category Type
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allow the duration to be invalid.
 */
export function IsDuration(options?: { allow_invalid?: boolean } & ValidationOptions) {
    return ValidateBy(
        {
            name: IS_DURATION,
            validator: {
                validate: (value, _arguments): boolean => isDuration(value, { allow_invalid: options?.allow_invalid }),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${options?.allow_invalid ? 'a' : 'a valid'} Dayjs duration`,
                    options
                ),
            },
        },
        options
    )
}
