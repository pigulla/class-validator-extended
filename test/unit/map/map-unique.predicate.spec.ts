import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapUnique } from '../../../src'
import { itEach } from '../../util'

describe('mapUnique', () => {
    function projection(n: number): number {
        return n % 4
    }

    itEach<[unknown]>([[undefined], [null], ['']])(
        'should throw for %j as the projection',
        value => {
            assert.throws(() => mapUnique(0, value as (value: number) => number), TypeError)
        },
    )

    itEach<[Map<unknown, unknown>]>([
        [new Map()],
        [new Map([['a', 1]])],
        [
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
                ['d', 4],
            ]),
        ],
    ])('should be true for %j', set => {
        assert.equal(mapUnique(set, projection), true)
    })

    itEach<[unknown]>([
        [null],
        [undefined],
        [
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
                ['e', 5],
            ]),
        ],
    ])('should be false for %j', set => {
        assert.equal(mapUnique(set, projection), false)
    })
})
