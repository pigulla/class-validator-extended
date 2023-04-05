import 'jest-extended'

import type { ValidationOptions } from 'class-validator'

import { NOT_MATCHES, notMatches, NotMatches } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/string/not-matches/not-matches.predicate')

describe('@NotMatches', () => {
    const mockedNotMatches = notMatches as unknown as jest.Mock

    type Options = [RegExp, ValidationOptions?] | [string, string?, ValidationOptions?]
    const matrix: Record<string, Options[]> = {
        'property must not match /^foo/i regular expression': [[/^foo/i, undefined]],
        'property must not match ^foo regular expression': [['^foo', 'i']],
        'each value in property must not match /^foo/i regular expression': [[/^foo/i, { each: true }]],
        'each value in property must not match ^foo regular expression': [['^foo', 'i', { each: true }]],
    }

    beforeEach(() => {
        mockedNotMatches.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    @NotMatches(...options)
                    property: unknown
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: NOT_MATCHES,
                    message,
                })
            })
        })
    }
})
