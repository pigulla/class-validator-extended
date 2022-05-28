import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import type { Constructor } from './is-subclass.predicate'
import { isSubclass } from './is-subclass.predicate'

/** @hidden */
export const IS_SUBCLASS = 'isSubclass'

/**
 * Checks if the given value is an instance (or subclass) of the given class.
 *
 * This is similar to the built-in `@IsInstance` except that its TypeScript
 * definition also supports the (base) class to be abstract.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is an instance of User or a derived class.
 * @IsSubclass(User)
 * user: User
 * ```
 *
 * @category Type
 * @param targetType The allowed class.
 * @param options Generic class-validator options.
 */
export function IsSubclass(targetType: Constructor, options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_SUBCLASS,
            validator: {
                validate: (value, _arguments): boolean => isSubclass(value, targetType),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be an instance of ${targetType.name} or one of its subclasses`,
                    options
                ),
            },
        },
        options
    )
}
