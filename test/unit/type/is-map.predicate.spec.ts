import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isMap } from '../../../src'
import { itEach } from '../../util'

describe('isMap', () => {
    itEach<[unknown]>([
        [new Map()],
        [
            new Map([
                [42, 'fourtytwo'],
                [13, 'thirteen'],
            ]),
        ],
    ])('should be true for %j', (value: unknown) => {
        assert.equal(isMap(value), true)
    })

    itEach<[unknown]>([[undefined], [null], [{}], [[]], [new Set()], [new WeakMap()]])(
        'should be false for %j',
        (value: unknown) => {
            assert.equal(isMap(value), false)
        },
    )
})
