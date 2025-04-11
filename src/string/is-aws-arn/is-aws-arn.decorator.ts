import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isAwsARN } from './is-aws-arn.predicate'

/** @hidden */
export const IS_AWS_ARN = 'isAwsArn'

/**
 * Checks if the given value is an AWS ARN string (as specified in the [AWS Documentation](https://docs.aws.amazon.com/quicksight/latest/APIReference/qs-arn-format.html)).
 *
 * Beware that this decorator only checks for syntactic validity, it does not check if the partition, service or region
 * really exists. The region and account id are always optional, even if required for the specific service.
 *
 * For example, the following strings are considered valid if though they are technically not:
 *  - `arn:aws:foo:eu-central-1:bar`
 *    (there is no `foo` AWS service)
 *  - `arn:aws:ec2::123456789012:instance/i-1234567890abcdef0`
 *    (EC2 requires a region which is omitted)
 *  - `arn:aws:ec2:us-east-42:123456789012:instance/i-1234567890abcdef0`
 *    (the region `us-east-42` does not exist)
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a valid looking AWS ARN string
 * @IsAwsARN()
 * arn: string = 'arn:aws:clouddirectory:us-west-2:123456789012:schema/development/cognito'
 * ```
 *
 * @category String
 * @deprecated
 * @param options Generic class-validator options.
 */
export function IsAwsARN(options?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_AWS_ARN,
            validator: {
                validate: (value, _arguments): boolean => isAwsARN(value),
                defaultMessage: buildMessage(eachPrefix => `${eachPrefix}$property must be an AWS ARN string`, options),
            },
        },
        options
    )
}
