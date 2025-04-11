import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { setUnique } from '../../../src'
import { itEach } from '../../util'

describe('setUnique', () => {
    function projection(n: number): number {
        return n % 4
    }

    itEach<[unknown]>([[undefined], [null], ['']])('should throw for %j as the projection', value => {
        assert.throws(() => setUnique(0, value as (value: number) => number), TypeError)
    })

    itEach<[Set<unknown>]>([[new Set()], [new Set([1])], [new Set([1, 2, 3, 4])]])('should be true for %j', set => {
        assert.equal(setUnique(set, projection), true)
    })

    itEach<[unknown]>([[null], [undefined], [new Set([1, 2, 5])]])('should be false for %j', set => {
        assert.equal(setUnique(set, projection), false)
    })
})
