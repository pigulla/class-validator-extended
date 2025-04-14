import assert from 'node:assert/strict'
import { after, before, describe, mock } from 'node:test'

import dayjs from 'dayjs'

import { futureDate } from '../../../src'
import { itEach } from '../../util'

describe('futureDate', () => {
    const now = dayjs('2020-05-01T06:00:00.000Z')

    before(() => {
        mock.timers.enable({ apis: ['Date'], now: now.toDate() })
    })

    after(() => {
        mock.timers.reset()
    })

    itEach<[unknown]>([[now.add(1, 'millisecond').toDate()], [now.add(7, 'days').toDate()]])(
        'should be true for %j',
        value => {
            assert.equal(futureDate(value), true)
        },
    )

    itEach<[unknown]>([[undefined], [null], [now], [now.subtract(1, 'millisecond').toDate()]])(
        'should be false for %j',
        value => {
            assert.equal(futureDate(value), false)
        },
    )
})
