import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isDayjs } from './is-dayjs.predicate'

/** @hidden */
export const IS_DAYJS = 'isDayjs'

/**
 * Checks if the given value is a valid Dayjs object.
 *
 * Note that `dayjs` is not a constructor, so you can't simply use `@IsInstance(dayjs)`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a Dayjs object.
 * @IsDayjs()
 * dateOfBirth: Dayjs
 * ```
 *
 * @category Type
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_invalid: boolean = false`
 *     If true, allow the Dayjs object to be invalid (see [isValid()](https://day.js.org/docs/en/parse/is-valid)).
 */
export function IsDayjs(
    options?: { allow_invalid?: boolean } & ValidationOptions,
): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_DAYJS,
            validator: {
                validate: (value, _arguments): boolean =>
                    isDayjs(value, { allow_invalid: options?.allow_invalid }),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${options?.allow_invalid ? 'a' : 'a valid'} Dayjs object`,
                    options,
                ),
            },
        },
        options,
    )
}
