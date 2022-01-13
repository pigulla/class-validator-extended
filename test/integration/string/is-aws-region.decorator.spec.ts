import 'jest-extended'

import { IS_AWS_REGION, IsAwsRegion, isAwsRegion } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/string/is-aws-region/is-aws-region.predicate')

describe('@IsAwsRegion', () => {
    const mockedIsAwsRegion = isAwsRegion as unknown as jest.Mock

    type Options = Parameters<typeof IsAwsRegion>
    const matrix: Record<string, Options[]> = {
        'property must be an AWS region string': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an AWS region string': [[{ each: true }]],
    }

    beforeEach(() => {
        mockedIsAwsRegion.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsAwsRegion(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_AWS_REGION,
                    message,
                })
            })
        })
    }
})
