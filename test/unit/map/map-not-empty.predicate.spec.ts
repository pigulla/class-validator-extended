import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { mapNotEmpty } from '../../../src'
import { itEach } from '../../util'

describe('mapNotEmpty', () => {
    itEach([
        [new Map([[42, 'foo']])],
        [
            new Map<unknown, unknown>([
                ['bar', 'baz'],
                [42, 13],
            ]),
        ],
    ])('should be true for %j', value => {
        assert.equal(mapNotEmpty(value), true)
    })

    itEach<[unknown]>([
        [undefined],
        [null],
        [0],
        ['0'],
        [new Date('2020-07-20T08:12:58.536Z')],
        ['foo'],
        [new Map()],
    ])('should be false for %j', value => {
        assert.equal(mapNotEmpty(value), false)
    })
})
