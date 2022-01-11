import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isAwsRegion } from './is-aws-region.predicate'

/** @hidden */
export const IS_AWS_REGION = 'isAwsRegion'

/**
 * Checks if the given value is an AWS region string.
 *
 * Beware that this decorator only checks for syntactic validity, it does not actually check if the region exists. For
 * instance, it will accept "eu-central-9" which - at the time of writing - does not exist.
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a valid looking AWS region
 * @IsAwsRegion()
 * region: string = 'eu-central-1
 * ```
 *
 * @category String
 * @param options Generic class-validator options.
 */
export function IsAwsRegion(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_AWS_REGION,
            validator: {
                validate: (value, _arguments): boolean => isAwsRegion(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be an AWS region string`,
                    options
                ),
            },
        },
        options
    )
}
