import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { ConfigType } from 'dayjs'

import { minDayjs } from './min-dayjs.predicate'

/** @hidden */
export const MIN_DAYJS = 'minDayjs'

/**
 * Checks if the given value is a Dayjs object not earlier than `minimum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is after the infamous Y2K.
 * @MinDayjs('2000-01-01T00:00:00.000Z')
 * y2kUnsafeDate: Dayjs
 * ```
 *
 * @category Dayjs
 * @param minimum The minimum allowed value.
 * @param options Generic class-validator options.
 */
export function MinDayjs(minimum: ConfigType, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => minDayjs(value, minimum),
                defaultMessage: buildMessage(
                    eachPrefix => `minimal allowed date for ${eachPrefix}$property is $constraint1`,
                    options
                ),
            },
        },
        options
    )
}
