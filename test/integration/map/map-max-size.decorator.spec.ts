import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { MAP_MAX_SIZE, MapMaxSize } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapMaxSize', () => {
    type Options = Parameters<typeof MapMaxSize>

    const maximum = 13
    const matrix: Record<string, Options[]> = {
        'property must contain not more than 13 elements': [
            [maximum],
            [maximum, {}],
            [maximum, { each: undefined }],
            [maximum, { each: false }],
        ],
        'each value in property must contain not more than 13 elements': [
            [maximum, { each: true }],
        ],
    }

    const mockedMapMaxSize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-max-size/map-max-size.predicate.ts', {
        namedExports: {
            mapMaxSize: mockedMapMaxSize,
        },
    })
    const { MapMaxSize: Decorator, MAP_MAX_SIZE: SYMBOL } =
        require('../../../src/map/map-max-size/map-max-size.decorator') as {
            MapMaxSize: typeof MapMaxSize
            MAP_MAX_SIZE: typeof MAP_MAX_SIZE
        }

    afterEach(() => mockedMapMaxSize.mock.resetCalls())
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
                    assert.equal(mockedMapMaxSize.mock.callCount(), 1)
                    assert.deepEqual(mockedMapMaxSize.mock.calls[0].arguments, [value, options[0]])
                },
            )
        })
    }
})
