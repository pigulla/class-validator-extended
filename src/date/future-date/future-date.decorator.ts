import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { futureDate } from './future-date.predicate'

/** @hidden */
export const FUTURE_DATE = 'futureDate'

/**
 * Checks if the given value is a Date object in the future.
 *
 * Beware that the behaviour of this check depends on the current time and can thus be difficult to test. In particular,
 * as time goes by the property can become invalid without ever changing its value.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is in the future.
 * @FutureDay()
 * scheduledFor: Date
 * ```
 *
 * @category Date
 * @param options Generic class-validator options.
 */
export function FutureDate(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: FUTURE_DATE,
            validator: {
                validate: (value, _arguments): boolean => futureDate(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Date instance in the future`,
                    options
                ),
            },
        },
        options
    )
}
