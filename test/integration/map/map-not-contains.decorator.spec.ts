import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { MAP_NOT_CONTAINS, MapNotContains } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@MapNotContains', () => {
    type Options = Parameters<typeof MapNotContains>

    const forbidden = [1, 2, 3]
    const matrix: Record<string, Options[]> = {
        'property must not contain any of the following values: 1, 2, 3': [
            [forbidden],
            [forbidden, {}],
            [forbidden, { each: undefined }],
            [forbidden, { each: false }],
        ],
        'each value in property must not contain any of the following values: 1, 2, 3': [
            [forbidden, { each: true }],
        ],
    }

    const mockedMapNotContains = mock.fn(() => false)
    const mockedModule = mock.module(
        '../../../src/map/map-not-contains/map-not-contains.predicate.ts',
        {
            namedExports: {
                mapNotContains: mockedMapNotContains,
            },
        },
    )
    const { MapNotContains: Decorator, MAP_NOT_CONTAINS: SYMBOL } =
        require('../../../src/map/map-not-contains/map-not-contains.decorator') as {
            MapNotContains: typeof MapNotContains
            MAP_NOT_CONTAINS: typeof MAP_NOT_CONTAINS
        }

    afterEach(() => mockedMapNotContains.mock.resetCalls())
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
                    assert.equal(mockedMapNotContains.mock.callCount(), 1)
                    assert.deepEqual(mockedMapNotContains.mock.calls[0].arguments, [
                        value,
                        options[0],
                    ])
                },
            )
        })
    }
})
