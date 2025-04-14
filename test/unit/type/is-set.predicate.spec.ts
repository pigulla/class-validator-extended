import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isSet } from '../../../src'
import { itEach } from '../../util'

describe('isSet', () => {
    itEach<[unknown]>([[new Set()], [new Set([42, 13])]])(
        'should be true for %j',
        (value: unknown) => {
            assert.equal(isSet(value), true)
        },
    )

    itEach<[unknown]>([[undefined], [null], [{}], [[]], [new Map()], [new WeakSet()]])(
        'should be false for %j',
        (value: unknown) => {
            assert.equal(isSet(value), false)
        },
    )
})
