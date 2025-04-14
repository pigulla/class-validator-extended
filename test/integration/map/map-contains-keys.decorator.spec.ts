import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { MAP_CONTAINS_KEYS, MapContainsKeys } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapContainsKeys', () => {
    type Options = Parameters<typeof MapContainsKeys>

    const required = [1, 2, 3]
    const matrix: Record<string, Options[]> = {
        'property must contain all of the following keys: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must contain all of the following keys: 1, 2, 3': [
            [required, { each: true }],
        ],
    }

    const mockedMapContainsKeys = mock.fn(() => false)
    const mockedModule = mock.module(
        '../../../src/map/map-contains-keys/map-contains-keys.predicate.ts',
        {
            namedExports: {
                mapContainsKeys: mockedMapContainsKeys,
            },
        },
    )
    const { MapContainsKeys: Decorator, MAP_CONTAINS_KEYS: SYMBOL } =
        require('../../../src/map/map-contains-keys/map-contains-keys.decorator') as {
            MapContainsKeys: typeof MapContainsKeys
            MAP_CONTAINS_KEYS: typeof MAP_CONTAINS_KEYS
        }

    afterEach(() => mockedMapContainsKeys.mock.resetCalls())
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
                    assert.equal(mockedMapContainsKeys.mock.callCount(), 1)
                    assert.deepEqual(mockedMapContainsKeys.mock.calls[0].arguments, [
                        value,
                        options[0],
                    ])
                },
            )
        })
    }
})
