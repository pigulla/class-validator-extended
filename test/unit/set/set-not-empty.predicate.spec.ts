import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { setNotEmpty } from '../../../src'
import { itEach } from '../../util'

describe('setNotEmpty', () => {
    itEach<[unknown]>([[new Set([42])], [new Set(['bar', 'baz'])]])('should be true for %j', value => {
        assert.equal(setNotEmpty(value), true)
    })

    itEach<[unknown]>([[undefined], [null], [0], ['0'], [new Date('2020-07-20T08:12:58.536Z')], ['foo'], [new Set()]])(
        'should be false for %j',
        value => {
            assert.equal(setNotEmpty(value), false)
        }
    )
})
