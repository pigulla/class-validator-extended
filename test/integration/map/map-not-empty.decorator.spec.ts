import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { MAP_NOT_EMPTY, MapNotEmpty } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapNotEmpty', () => {
    type Options = Parameters<typeof MapNotEmpty>

    const matrix: Record<string, Options[]> = {
        'property must not be an empty map': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must not be an empty map': [[{ each: true }]],
    }

    const mockedMapNotEmpty = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-not-empty/map-not-empty.predicate.ts', {
        namedExports: {
            mapNotEmpty: mockedMapNotEmpty,
        },
    })
    const { MapNotEmpty: Decorator, MAP_NOT_EMPTY: SYMBOL } =
        require('../../../src/map/map-not-empty/map-not-empty.decorator') as {
            MapNotEmpty: typeof MapNotEmpty
            MAP_NOT_EMPTY: typeof MAP_NOT_EMPTY
        }

    afterEach(() => mockedMapNotEmpty.mock.resetCalls())
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
                assert.equal(mockedMapNotEmpty.mock.callCount(), 1)
                assert.deepEqual(mockedMapNotEmpty.mock.calls[0].arguments, [value])
            })
        })
    }
})
