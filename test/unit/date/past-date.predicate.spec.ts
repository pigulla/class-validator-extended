import assert from 'node:assert/strict'
import { describe, before, after, mock } from 'node:test'

import dayjs from 'dayjs'

import { pastDate } from '../../../src'
import { itEach } from '../../util'

describe('pastDate', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    before(() => {
        mock.timers.enable({ apis: ['Date'], now: now.toDate() })
    })

    after(() => {
        mock.timers.reset()
    })

    itEach<[unknown]>([[now.subtract(1, 'millisecond').toDate()], [now.subtract(7, 'days').toDate()]])(
        'should be true for %j',
        value => {
            assert.equal(pastDate(value), true)
        }
    )

    itEach<[unknown]>([[undefined], [null], [now], [now.add(1, 'millisecond').toDate()]])(
        'should be false for %j',
        value => {
            assert.equal(pastDate(value), false)
        }
    )
})
