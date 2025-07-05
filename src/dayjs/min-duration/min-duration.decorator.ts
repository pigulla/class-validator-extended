import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'
import type { Duration, DurationUnitsObjectType, DurationUnitType } from 'dayjs/plugin/duration'

import { createDuration } from '../create-duration'
import { isValidDuration } from '../is-valid-duration'

import { minDuration } from './min-duration.predicate'

/** @hidden */
export const MIN_DURATION = 'minDuration'

function message(options?: { inclusive?: boolean }): string {
    return `a valid Dayjs duration ${
        options?.inclusive ? 'equal to or not shorter than' : 'not shorter than'
    } $constraint1`
}

/**
 * Checks if the given value is a valid Dayjs duration not longer than `minimum`.
 *
 * The minimum can be given as either:
 *   - a Dayjs duration
 *   - an ISO 8601 string, e.g. `"PT1H"`
 *   - a units object, e.g. `{ hour: 1, minute: 30 }`
 *   - a time/unit tuple, e.g. `[1, 'hour]`
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a duration at least 1 hour long
 * @MinDuration([1, 'hour'], { inclusive: true })
 * value: Duration
 * ```
 *
 * @category Dayjs
 * @param minimum The minimum allowed value.
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `inclusive: boolean = false`
 *     If true, allow the `minimum` duration as well.
 */
export function MinDuration(
    minimum: Duration | string | DurationUnitsObjectType | [time: number, unit?: DurationUnitType],
    options?: { inclusive?: boolean } & ValidationOptions,
): PropertyDecorator {
    const min = createDuration(minimum)

    if (!isValidDuration(min)) {
        throw new TypeError('Parameter "minimum" must be a valid Dayjs duration')
    }

    return ValidateBy(
        {
            name: MIN_DURATION,
            constraints: [min.toISOString()],
            validator: {
                validate: (value, _arguments): boolean =>
                    minDuration(value, min, { inclusive: options?.inclusive }),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be ${message(options)}`,
                    options,
                ),
            },
        },
        options,
    )
}
