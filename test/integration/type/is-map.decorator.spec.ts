import assert from 'node:assert'
import { after, afterEach, describe, mock } from 'node:test'

import type { IS_MAP, IsMap } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsMap', () => {
    type Options = Parameters<typeof IsMap>

    const matrix: Record<string, Options[]> = {
        'property must be an instance of Map': [[], [{}], [{ each: undefined }], [{ each: false }]],
        'each value in property must be an instance of Map': [[{ each: true }]],
    }

    const mockedIsMap = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/type/is-map/is-map.predicate.ts', {
        namedExports: {
            isMap: mockedIsMap,
        },
    })
    const { IsMap: Decorator, IS_MAP: SYMBOL } =
        require('../../../src/type/is-map/is-map.decorator') as {
            IsMap: typeof IsMap
            IS_MAP: typeof IS_MAP
        }

    afterEach(() => mockedIsMap.mock.resetCalls())
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
                    assert.equal(mockedIsMap.mock.callCount(), 1)
                    assert.deepEqual(mockedIsMap.mock.calls[0].arguments, [value])
                },
            )
        })
    }
})
