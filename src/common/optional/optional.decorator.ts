import type { ValidationOptions } from 'class-validator'
import { ValidateIf } from 'class-validator'

/**
 * Only validates the given value if it is not `undefined`.
 *
 * This is similar to the built-in `@IsOptional` except that it does not allow 'null'. Note that this validator does not
 * work as expected with `{ each: true }` (because it is based on `@ValidateIf` which does not either).
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a string or undefined (but not null).
 * @Optional()
 * @IsString()
 * value?: string
 * ```
 *
 * @category Common
 * @param options Generic class-validator options.
 */
export function Optional(options?: ValidationOptions): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function optionalDecorator(prototype: Object, propertyKey: string | symbol): void {
        ValidateIf(object => object[propertyKey] !== undefined, options)(prototype, propertyKey)
    }
}
