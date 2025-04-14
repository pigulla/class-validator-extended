import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { MAP_SIZE, MapSize } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapSize', () => {
    type Options = Parameters<typeof MapSize>

    const size = 13
    const matrix: Record<string, Options[]> = {
        'property must contain exactly 13 element(s)': [
            [size],
            [size, {}],
            [size, { each: undefined }],
            [size, { each: false }],
        ],
        'each value in property must contain exactly 13 element(s)': [[size, { each: true }]],
    }

    const mockedMapSize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-size/map-size.predicate.ts', {
        namedExports: {
            mapSize: mockedMapSize,
        },
    })
    const { MapSize: Decorator, MAP_SIZE: SYMBOL } =
        require('../../../src/map/map-size/map-size.decorator') as {
            MapSize: typeof MapSize
            MAP_SIZE: typeof MAP_SIZE
        }

    afterEach(() => mockedMapSize.mock.resetCalls())
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
                    assert.equal(mockedMapSize.mock.callCount(), 1)
                    assert.deepEqual(mockedMapSize.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
