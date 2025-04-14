import assert from 'node:assert/strict'
import { beforeEach, describe } from 'node:test'

import { setContains } from '../../../src'
import { itEach } from '../../util'

describe('setContains', () => {
    let set: Set<unknown>

    beforeEach(() => {
        set = new Set(['foo', 42, null])
    })

    itEach<[Iterable<unknown>]>([[[42]], [new Set([null])], [new Set(['foo', 42, null])]])(
        'should be true for %j',
        value => {
            assert.equal(setContains(set, value), true)
        },
    )

    itEach<[Iterable<unknown>]>([
        [new Set([0])],
        [[undefined]],
        [['42']],
        [new Set(['foo', 42, undefined])],
    ])('should be false for %j', values => {
        assert.equal(setContains(set, values), false)
    })
})
