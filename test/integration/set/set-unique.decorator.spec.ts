import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { SET_UNIQUE, SetUnique } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@SetUnique', () => {
    type Options = Parameters<typeof SetUnique>

    const projection = mock.fn()
    const matrix: Record<string, Options[]> = {
        'property must have unique values': [
            [projection],
            [projection, {}],
            [projection, { each: undefined }],
            [projection, { each: false }],
        ],
        'each value in property must have unique values': [[projection, { each: true }]],
    }

    const mockedSetUnique = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/set/set-unique/set-unique.predicate.ts', {
        namedExports: {
            setUnique: mockedSetUnique,
        },
    })
    const { SetUnique: Decorator, SET_UNIQUE: SYMBOL } =
        require('../../../src/set/set-unique/set-unique.decorator') as {
            SetUnique: typeof SetUnique
            SET_UNIQUE: typeof SET_UNIQUE
        }

    afterEach(() => mockedSetUnique.mock.resetCalls())
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
                    assert.equal(mockedSetUnique.mock.callCount(), 1)
                    assert.deepEqual(mockedSetUnique.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
