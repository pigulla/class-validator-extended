import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isDuration } from './is-duration.predicate'

/** @hidden */
export const IS_DURATION = 'isDuration'

/**
 * Checks if the given value is a Dayjs Duration object.
 *
 * This requires the [Duration-plugin](https://day.js.org/docs/en/plugin/duration) to be loaded. If this is not the
 * case, an error will be thrown.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a Dayjs Duration object.
 * @IsDuration()
 * value: Duration
 * ```
 *
 * @category Type
 * @param options Generic class-validator options.
 */
export function IsDuration(options?: ValidationOptions) {
    return ValidateBy(
        {
            name: IS_DURATION,
            validator: {
                validate: (value, _arguments): boolean => isDuration(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Dayjs duration object`,
                    options
                ),
            },
        },
        options
    )
}
