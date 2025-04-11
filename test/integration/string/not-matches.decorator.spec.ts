import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import type { ValidationOptions } from 'class-validator'

import type { NotMatches, NOT_MATCHES } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@NotMatches', () => {
    type Options = [RegExp, ValidationOptions?] | [string, string?, ValidationOptions?]

    const matrix: Record<string, Options[]> = {
        'property must not match /^foo/i regular expression': [[/^foo/i, undefined]],
        'property must not match ^foo regular expression': [['^foo', 'i']],
        'each value in property must not match /^foo/i regular expression': [[/^foo/i, { each: true }]],
        'each value in property must not match ^foo regular expression': [['^foo', 'i', { each: true }]],
    }

    const mockedNotMatches = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/string/not-matches/not-matches.predicate.ts', {
        namedExports: {
            notMatches: mockedNotMatches,
        },
    })
    const { NotMatches: Decorator, NOT_MATCHES: SYMBOL } =
        require('../../../src/string/not-matches/not-matches.decorator') as {
            NotMatches: typeof NotMatches
            NOT_MATCHES: typeof NOT_MATCHES
        }

    afterEach(() => mockedNotMatches.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    @Decorator(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SYMBOL,
                    message,
                })
                assert.equal(mockedNotMatches.mock.callCount(), 1)
                assert.deepEqual(mockedNotMatches.mock.calls[0].arguments, [
                    value,
                    options[0],
                    typeof options[1] === 'string' ? options[1] : undefined,
                ])
            })
        })
    }
})
