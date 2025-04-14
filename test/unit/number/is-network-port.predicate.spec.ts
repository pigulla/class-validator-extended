import assert from 'node:assert/strict'
import { describe } from 'node:test'

import { isNetworkPort } from '../../../src'
import { itEach } from '../../util'

describe('isNetworkPort', () => {
    itEach<[unknown]>([
        [undefined],
        [null],
        [false],
        [''],
        ['0'],
        ['80'],
        ['8080'],
        [-1],
        [65_536],
        [100_000],
        [BigInt(42)],
        [BigInt(8_080)],
    ])('should be false for %s', (value: unknown) => {
        assert.equal(isNetworkPort(value), false)
    })

    describe('with default options', () => {
        itEach<[number]>([[0], [80], [3_000], [8_080], [65_535]])(
            'should be true for %j',
            (value: unknown) => {
                assert.equal(isNetworkPort(value), true)
            },
        )

        itEach<[number]>([[-1]])('should be false for %s', (value: unknown) => {
            assert.equal(isNetworkPort(value), false)
        })
    })

    describe('with allow_system_allocated set to false', () => {
        const options = { allow_system_allocated: false }

        itEach<[number]>([[-1], [0]])('should be false for %s', (value: unknown) => {
            assert.equal(isNetworkPort(value, options), false)
        })

        itEach<[number]>([[80], [3_000], [8_080], [65_535]])(
            'should be true for %s',
            (value: unknown) => {
                assert.equal(isNetworkPort(value, options), true)
            },
        )
    })

    describe('with allow_system_ports set to false', () => {
        const options = { allow_system_ports: false }

        itEach<[number]>([[-1], [80]])('should be false for %s', (value: unknown) => {
            assert.equal(isNetworkPort(value, options), false)
        })

        itEach<[number]>([[0], [3_000], [8_080], [65_535]])(
            'should be true for %s',
            (value: unknown) => {
                assert.equal(isNetworkPort(value, options), true)
            },
        )
    })

    describe('with allow_system_allocated and allow_system_ports set to false', () => {
        const options = { allow_system_allocated: false, allow_system_ports: false }

        itEach<[number]>([[-1], [0], [80]])('should be false for %s', (value: unknown) => {
            assert.equal(isNetworkPort(value, options), false)
        })

        itEach<[number]>([[3_000], [8_080], [65_535]])(
            'should be true for %s',
            (value: unknown) => {
                assert.equal(isNetworkPort(value, options), true)
            },
        )
    })
})
