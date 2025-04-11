import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { MAP_MIN_SIZE, MapMinSize } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapMinSize', () => {
    type Options = Parameters<typeof MapMinSize>

    const minimum = 13
    const matrix: Record<string, Options[]> = {
        'property must contain at least 13 elements': [
            [minimum],
            [minimum, {}],
            [minimum, { each: undefined }],
            [minimum, { each: false }],
        ],
        'each value in property must contain at least 13 elements': [[minimum, { each: true }]],
    }

    const mockedMapMinSize = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-min-size/map-min-size.predicate.ts', {
        namedExports: {
            mapMinSize: mockedMapMinSize,
        },
    })
    const { MapMinSize: Decorator, MAP_MIN_SIZE: SYMBOL } =
        require('../../../src/map/map-min-size/map-min-size.decorator') as {
            MapMinSize: typeof MapMinSize
            MAP_MIN_SIZE: typeof MAP_MIN_SIZE
        }

    afterEach(() => mockedMapMinSize.mock.resetCalls())
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
                assert.equal(mockedMapMinSize.mock.callCount(), 1)
                assert.deepEqual(mockedMapMinSize.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
