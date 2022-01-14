import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isTimezone } from './is-timezone.predicate'

/** @hidden */
export const IS_TIMEZONE = 'isTimezone'

/**
 * Checks if the given value is a valid timezone string.
 *
 * Uses [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) internally for
 * validation.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a valid timezone.
 * @IsTimezone()
 * timezone: string = 'Pacific/Guam'
 * ```
 *
 * @category String
 * @param options Generic class-validator options.
 */
export function IsTimezone(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_TIMEZONE,
            validator: {
                validate: (value, _arguments): boolean => isTimezone(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a valid timezone string`,
                    options
                ),
            },
        },
        options
    )
}
