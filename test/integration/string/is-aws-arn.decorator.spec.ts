import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { IS_AWS_ARN, IsAwsARN } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsAwsARN', () => {
    type Options = Parameters<typeof IsAwsARN>

    const matrix: Record<string, Options[]> = {
        'property must be an AWS ARN string': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an AWS ARN string': [[{ each: true }]],
    }

    const mockedIsAwsARN = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/string/is-aws-arn/is-aws-arn.predicate.ts', {
        namedExports: {
            isAwsARN: mockedIsAwsARN,
        },
    })
    const { IsAwsARN: Decorator, IS_AWS_ARN: SYMBOL } =
        require('../../../src/string/is-aws-arn/is-aws-arn.decorator') as {
            IsAwsARN: typeof IsAwsARN
            IS_AWS_ARN: typeof IS_AWS_ARN
        }

    afterEach(() => mockedIsAwsARN.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))(
                'when called with options %j',
                options => {
                    class TestClass {
                        @Decorator(...options)
                        property: unknown = value
                    }

                    expectValidationError(new TestClass(), {
                        property: 'property',
                        constraint: SYMBOL,
                        message,
                    })
                    assert.equal(mockedIsAwsARN.mock.callCount(), 1)
                    assert.deepEqual(mockedIsAwsARN.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
