import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { futureDayjs } from './future-dayjs.predicate'

/** @hidden */
export const FUTURE_DAYJS = 'futureDayjs'

/**
 * Checks if the given value is in the future.
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
 * @param options Generic class-validator options.
 */
export function FutureDayjs(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: FUTURE_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => futureDayjs(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Dayjs instance in the future`,
                    options
                ),
            },
        },
        options
    )
}
