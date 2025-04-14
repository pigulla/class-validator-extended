import assert from 'node:assert/strict'
import { beforeEach, describe } from 'node:test'

import { setNotContains } from '../../../src'
import { itEach } from '../../util'

describe('setNotContains', () => {
    let set: Set<unknown>

    beforeEach(() => {
        set = new Set(['foo', 42, null])
    })

    itEach<[Iterable<unknown>]>([[new Set([0])], [[undefined]], [['42']]])(
        'should be true for %j',
        values => {
            assert.equal(setNotContains(set, values), true)
        },
    )

    itEach<[Iterable<unknown>]>([[[42]], [new Set([null])], [new Set(['bam', 'baz', 'foo'])]])(
        'should be false for %j',
        value => {
            assert.equal(setNotContains(set, value), false)
        },
    )
})
