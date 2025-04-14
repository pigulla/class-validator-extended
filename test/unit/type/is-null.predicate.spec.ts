import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isNull } from '../../../src'
import { itEach } from '../../util'

describe('isNull', () => {
    itEach<[unknown]>([[null]])('should be true for %j', (value: unknown) => {
        assert.equal(isNull(value), true)
    })

    itEach<[unknown]>([[undefined], [{}], [[]], [0], [''], [false]])(
        'should be false for %j',
        (value: unknown) => {
            assert.equal(isNull(value), false)
        },
    )
})
