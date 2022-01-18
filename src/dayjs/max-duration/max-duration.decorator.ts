import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { Duration, DurationUnitsObjectType, DurationUnitType } from 'dayjs/plugin/duration'

import { createDuration } from '../create-duration'
import { isValidDuration } from '../is-valid-duration'

import { maxDuration } from './max-duration.predicate'

/** @hidden */
export const MAX_DURATION = 'maxDuration'

function message(options?: { inclusive?: boolean }): string {
    return `a valid Dayjs duration object ${
        options?.inclusive ? 'equal to or not longer than' : 'not longer than'
    } $constraint1`
}

/**
 * Checks if the given value is a valid Dayjs duration object not longer than `maximum`.
 *
 * The minimum can be given as either:
 *   - a Dayjs duration object
 *   - an ISO 8601 string, e.g. `"PT1H"`
 *   - a units object, e.g. `{ hour: 1, minute: 30 }`
 *   - a time/unit tuple, e.g. `[1, 'hour]`
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a duration at most 1 hour long
 * @MaxDuration([1, 'hour'], { inclusive: true })
 * value: Duration
 * ```
 *
 * @category Dayjs
 * @param maximum The maximum allowed value.
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `inclusive: boolean = false`
 *     If true, allow the `maximum` duration as well.
 */
export function MaxDuration(
    maximum: Duration | string | DurationUnitsObjectType | [time: number, unit?: DurationUnitType],
    options?: { inclusive?: boolean } & ValidationOptions
): PropertyDecorator {
    const max = createDuration(maximum)

    if (!isValidDuration(max)) {
        throw new TypeError('Parameter "maximum" must be a valid Dayjs duration')
    }

    return ValidateBy(
        {
            name: MAX_DURATION,
            constraints: [max.toISOString()],
            validator: {
                validate: (value, _arguments): boolean => maxDuration(value, max, { inclusive: options?.inclusive }),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be ${message(options)}`,
                    options
                ),
            },
        },
        options
    )
}
