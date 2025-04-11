import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { MAP_UNIQUE, MapUnique } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapUnique', () => {
    type Options = Parameters<typeof MapUnique>

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

    const mockedMapUnique = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/map/map-unique/map-unique.predicate.ts', {
        namedExports: {
            mapUnique: mockedMapUnique,
        },
    })
    const { MapUnique: Decorator, MAP_UNIQUE: SYMBOL } =
        require('../../../src/map/map-unique/map-unique.decorator') as {
            MapUnique: typeof MapUnique
            MAP_UNIQUE: typeof MAP_UNIQUE
        }

    afterEach(() => mockedMapUnique.mock.resetCalls())
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
                assert.equal(mockedMapUnique.mock.callCount(), 1)
                assert.deepEqual(mockedMapUnique.mock.calls[0].arguments, [value, options[0]])
            })
        })
    }
})
