import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'
import { ConfigType } from 'dayjs'

import { maxDayjs } from './max-dayjs.predicate'

/** @hidden */
export const MAX_DAYJS = 'maxDayjs'

/**
 * Checks if the given value is a Dayjs object not later than `maximum`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is before the infamous Y2K.
 * @MaxDayjs('2000-01-01T00:00:00.000Z')
 * y2kSafeDate: Dayjs
 * ```
 *
 * @category Dayjs
 * @param maximum The maximum allowed value.
 * @param options Generic class-validator options.
 */
export function MaxDayjs(maximum: ConfigType, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => maxDayjs(value, maximum),
                defaultMessage: buildMessage(
                    eachPrefix => `maximal allowed date for ${eachPrefix}$property is $constraint1`,
                    options
                ),
            },
        },
        options
    )
}
