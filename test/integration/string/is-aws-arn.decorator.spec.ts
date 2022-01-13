import 'jest-extended'

import { IS_AWS_ARN, IsAwsARN, isAwsARN } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/string/is-aws-arn/is-aws-arn.predicate')

describe('@IsAwsARN', () => {
    const mockedIsAwsARN = isAwsARN as unknown as jest.Mock

    type Options = Parameters<typeof IsAwsARN>
    const matrix: Record<string, Options[]> = {
        'property must be an AWS ARN string': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an AWS ARN string': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsAwsARN.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsAwsARN(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_AWS_ARN,
                    message,
                })
            })
        })
    }
})
