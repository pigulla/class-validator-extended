import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { IS_AWS_REGION, IsAwsRegion } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsAwsRegion', () => {
    type Options = Parameters<typeof IsAwsRegion>

    const matrix: Record<string, Options[]> = {
        'property must be an AWS region string': [
            [],
            [{}],
            [{ each: undefined }],
            [{ each: false }],
        ],
        'each value in property must be an AWS region string': [[{ each: true }]],
    }

    const mockedIsAwsRegion = mock.fn(() => false)
    const mockedModule = mock.module(
        '../../../src/string/is-aws-region/is-aws-region.predicate.ts',
        {
            namedExports: {
                isAwsRegion: mockedIsAwsRegion,
            },
        },
    )
    const { IsAwsRegion: Decorator, IS_AWS_REGION: SYMBOL } =
        require('../../../src/string/is-aws-region/is-aws-region.decorator') as {
            IsAwsRegion: typeof IsAwsRegion
            IS_AWS_REGION: typeof IS_AWS_REGION
        }

    afterEach(() => mockedIsAwsRegion.mock.resetCalls())
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
                    assert.equal(mockedIsAwsRegion.mock.callCount(), 1)
                    assert.deepEqual(mockedIsAwsRegion.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
