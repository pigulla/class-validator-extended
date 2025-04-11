import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { MAP_UNIQUE_KEYS, MapUniqueKeys } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapUniqueKeys', () => {
    type Options = Parameters<typeof MapUniqueKeys>

    const projection = mock.fn()
    const matrix: Record<string, Options[]> = {
        'property must have unique keys': [
            [projection],
            [projection, {}],
            [projection, { each: undefined }],
            [projection, { each: false }],
        ],
        'each value in property must have unique keys': [[projection, { each: true }]],
    }

    const mockedMapUniqueKeys = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-unique-keys/map-unique-keys.predicate.ts', {
        namedExports: {
            mapUniqueKeys: mockedMapUniqueKeys,
        },
    })
    const { MapUniqueKeys: Decorator, MAP_UNIQUE_KEYS: SYMBOL } =
        require('../../../src/map/map-unique-keys/map-unique-keys.decorator') as {
            MapUniqueKeys: typeof MapUniqueKeys
            MAP_UNIQUE_KEYS: typeof MAP_UNIQUE_KEYS
        }

    afterEach(() => mockedMapUniqueKeys.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @Decorator(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SYMBOL,
                    message,
                })
                assert.equal(mockedMapUniqueKeys.mock.callCount(), 1)
                assert.deepEqual(mockedMapUniqueKeys.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
