import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { pastDayjs } from './past-dayjs.predicate'

/** @hidden */
export const PAST_DAYJS = 'pastDayjs'

/**
 * Checks if the given value is a Dayjs object in the past.
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
 * @param options Generic class-validator options.
 */
export function PastDayjs(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: PAST_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => pastDayjs(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Dayjs instance in the past`,
                    options
                ),
            },
        },
        options
    )
}
