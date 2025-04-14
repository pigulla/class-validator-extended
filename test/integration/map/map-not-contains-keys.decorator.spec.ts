import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { MAP_NOT_CONTAINS_KEYS, MapNotContainsKeys } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapNotContainsKeys', () => {
    type Options = Parameters<typeof MapNotContainsKeys>

    const forbidden = [1, 2, 3]
    const matrix: Record<string, Options[]> = {
        'property must not contain any of the following keys: 1, 2, 3': [
            [forbidden],
            [forbidden, {}],
            [forbidden, { each: undefined }],
            [forbidden, { each: false }],
        ],
        'each value in property must not contain any of the following keys: 1, 2, 3': [
            [forbidden, { each: true }],
        ],
    }

    const mockedMapNotContainsKeys = mock.fn(() => false)
    const mockedModule = mock.module(
        '../../../src/map/map-not-contains-keys/map-not-contains-keys.predicate.ts',
        {
            namedExports: {
                mapNotContainsKeys: mockedMapNotContainsKeys,
            },
        },
    )
    const { MapNotContainsKeys: Decorator, MAP_NOT_CONTAINS_KEYS: SYMBOL } =
        require('../../../src/map/map-not-contains-keys/map-not-contains-keys.decorator') as {
            MapNotContainsKeys: typeof MapNotContainsKeys
            MAP_NOT_CONTAINS_KEYS: typeof MAP_NOT_CONTAINS_KEYS
        }

    afterEach(() => mockedMapNotContainsKeys.mock.resetCalls())
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
                    assert.equal(mockedMapNotContainsKeys.mock.callCount(), 1)
                    assert.deepEqual(mockedMapNotContainsKeys.mock.calls[0].arguments, [
                        value,
                        options[0],
                    ])
                },
            )
        })
    }
})
