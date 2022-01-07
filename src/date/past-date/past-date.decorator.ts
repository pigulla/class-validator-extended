import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { pastDate } from './past-date.predicate'

/** @hidden */
export const PAST_DATE = 'pastDate'

/**
 * Checks if the given value is a Date object in the past.
 *
 * Beware that the behaviour of this check depends on the current time and can thus be difficult to test.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is in the past.
 * @PastDate()
 * created: Date
 * ```
 *
 * @category Date
 * @param options Generic class-validator options.
 */
export function PastDate(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: PAST_DATE,
            validator: {
                validate: (value, _arguments): boolean => pastDate(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Date instance in the past`,
                    options
                ),
            },
        },
        options
    )
}
