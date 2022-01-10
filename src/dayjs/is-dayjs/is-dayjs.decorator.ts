import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import type { IsDayjsOptions } from './is-dayjs.options'
import { isDayjs } from './is-dayjs.predicate'

/** @hidden */
export const IS_DAYJS = 'isDayjs'

/**
 * Checks if the given value is Dayjs object.
 *
 * Note that `dayjs` is not a constructor, so you can't simply use `@IsInstance(Dayjs)`.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a Dayjs object.
 * @IsDayjs()
 * dateOfBirth: Dayjs
 * ```
 *
 * @category Dayjs
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `is_valid: boolean = true`
 *     If true, checks that the Dayjs object is [valid](https://day.js.org/docs/en/parse/is-valid).
 */
export function IsDayjs(options: Partial<IsDayjsOptions> & ValidationOptions = {}): PropertyDecorator {
    const decoratorOptions: IsDayjsOptions & ValidationOptions = { is_valid: true, ...options }

    return ValidateBy(
        {
            name: IS_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => isDayjs(value, decoratorOptions),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${decoratorOptions.is_valid ? 'a valid' : 'a'} Dayjs instance`,
                    options
                ),
            },
        },
        options
    )
}
