import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { positiveBigInt } from '../../../src'
import { itEach } from '../../util'

describe('positiveBigInt', () => {
    itEach<[unknown]>([[BigInt(1)], [BigInt('10000')], [BigInt('100000000000')]])(
        'should be true for %s',
        value => {
            assert.equal(positiveBigInt(value), true)
        },
    )

    itEach<[unknown]>([[undefined], [null], [BigInt(0)], [BigInt(-1)]])(
        'should be false for %s',
        value => {
            assert.equal(positiveBigInt(value), false)
        },
    )
})
