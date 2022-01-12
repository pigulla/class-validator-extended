// Source:
//  https://docs.aws.amazon.com/quicksight/latest/APIReference/qs-arn-format.html
//  https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html

const regExp =
    /^arn:(?<partition>aws(?:-cn|-us-gov)?):(?<service>[a-z][\da-z-]*[\da-z]):(?<region>[a-z]{2}-[a-z]+-([1-9]\d*))?:(?<accountId>\d{12})?:(?<resourceId>.+)$/

/**
 * @category Predicates
 * @param value The value to validate.
 */
export function isAwsARN(value: unknown): value is string {
    if (typeof value !== 'string') {
        return false
    }

    return regExp.test(value)
}
