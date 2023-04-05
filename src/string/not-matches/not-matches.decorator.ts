import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { notMatches } from './not-matches.predicate'

/** @hidden */
export const NOT_MATCHES = 'notMatches'

/**
 * @overload
 * @param {RegExp} pattern The regular expression to validate against.
 * @param options Generic class-validator options.
 */
/**
 * @overload
 * @param {string} pattern The regular expression to validate against.
 * @param {string} modifiers The modifiers for the given regular expression.
 * @param options Generic class-validator options.
 */
/**
 * Checks if the given value is a string that does not match the given regular expression.
 *
 * #### Example
 * ```typescript
 * // Ensure the value does not start with "foo".
 * @NotMatches(/^foo/)
 * value: string = 'bar'
 *
 * // Ensure the value does not include "foo", ignoring case.
 * @NotMatches('foo', 'i')
 * value: string = 'bar'
 * ```
 *
 * @category String
 * @param {string | RegExp} pattern
 * @param options
 */
export function NotMatches(pattern: RegExp, options?: ValidationOptions): PropertyDecorator
export function NotMatches(pattern: string, modifiers?: string, options?: ValidationOptions): PropertyDecorator
export function NotMatches(
    pattern: RegExp | string,
    modifiersOrOptions?: string | ValidationOptions,
    options?: ValidationOptions
): PropertyDecorator {
    let modifiers: string | undefined
    if (modifiersOrOptions && modifiersOrOptions instanceof Object && !options) {
        options = modifiersOrOptions
    } else {
        modifiers = modifiersOrOptions as string
    }

    return ValidateBy(
        {
            name: NOT_MATCHES,
            constraints: [pattern, modifiers],
            validator: {
                validate: (value, arguments_): boolean =>
                    notMatches(
                        value,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        /* istanbul ignore next */ arguments_?.constraints[0],
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        /* istanbul ignore next */ arguments_?.constraints[1]
                    ),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must not match $constraint1 regular expression`,
                    options
                ),
            },
        },
        options
    )
}
