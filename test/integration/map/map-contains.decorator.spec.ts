import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { MAP_CONTAINS, MapContains } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapContains', () => {
    type Options = Parameters<typeof MapContains>

    const required = [1, 2, 3]
    const matrix: Record<string, Options[]> = {
        'property must contain all of the following values: 1, 2, 3': [
            [required],
            [required, {}],
            [required, { each: undefined }],
            [required, { each: false }],
        ],
        'each value in property must contain all of the following values: 1, 2, 3': [[required, { each: true }]],
    }

    const mockedMapContains = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-contains/map-contains.predicate.ts', {
        namedExports: {
            mapContains: mockedMapContains,
        },
    })
    const { MapContains: Decorator, MAP_CONTAINS: SYMBOL } =
        require('../../../src/map/map-contains/map-contains.decorator') as {
            MapContains: typeof MapContains
            MAP_CONTAINS: typeof MAP_CONTAINS
        }

    afterEach(() => mockedMapContains.mock.resetCalls())
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
                assert.equal(mockedMapContains.mock.callCount(), 1)
                assert.deepEqual(mockedMapContains.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
