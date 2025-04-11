import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isBigInt } from '../../../src/'
import { itEach } from '../../util'

describe('isBigInt', () => {
    itEach<[unknown]>([[BigInt(1)], [BigInt('100000000')]])('should be true for %s', (value: unknown) => {
        assert.equal(isBigInt(value), true)
    })

    itEach<[unknown]>([[undefined], [null], [0], ['0'], [Number.POSITIVE_INFINITY], [Number.NaN], ['1000000000000']])(
        'should be false for %s',
        (value: unknown) => {
            assert.equal(isBigInt(value), false)
        }
    )
})
