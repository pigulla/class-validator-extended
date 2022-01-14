import type { ValidationOptions } from 'class-validator'
import { ValidateIf } from 'class-validator'

/**
 * Only validates the given value if it is not `null`.
 *
 * This is similar to the built-in `@IsOptional` except that it does not allow 'undefined'. Note that this validator
 * does not work as expected with `{ each: true }` (because it is based on `@ValidateIf` which does not either).
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a string or null (but not undefined).
 * @Nullable()
 * @IsString()
 * value: string | null
 * ```
 *
 * @category Common
 * @param options Generic class-validator options.
 */
export function Nullable(options?: ValidationOptions): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function nullableDecorator(prototype: Object, propertyKey: string | symbol): void {
        ValidateIf(object => object[propertyKey] !== null, options)(prototype, propertyKey)
    }
}
