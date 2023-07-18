import 'jest-extended'

import { isNetworkPort } from '~'

describe('isNetworkPort', () => {
    it.each<[unknown]>([
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
    ])('should be false for %p', (value: unknown) => {
        expect(isNetworkPort(value)).toBeFalse()
    })

    describe('with default options', () => {
        it.each<[number]>([[0], [80], [3_000], [8_080], [65_535]])('should be true for %p', (value: unknown) => {
            expect(isNetworkPort(value)).toBeTrue()
        })

        it.each<[number]>([[-1]])('should be false for %p', (value: unknown) => {
            expect(isNetworkPort(value)).toBeFalse()
        })
    })

    describe('with allow_system_allocated set to false', () => {
        const options = { allow_system_allocated: false }

        it.each<[number]>([[-1], [0]])('should be false for %p', (value: unknown) => {
            expect(isNetworkPort(value, options)).toBeFalse()
        })

        it.each<[number]>([[80], [3_000], [8_080], [65_535]])('should be true for %p', (value: unknown) => {
            expect(isNetworkPort(value, options)).toBeTrue()
        })
    })

    describe('with allow_system_ports set to false', () => {
        const options = { allow_system_ports: false }

        it.each<[number]>([[-1], [80]])('should be false for %p', (value: unknown) => {
            expect(isNetworkPort(value, options)).toBeFalse()
        })

        it.each<[number]>([[0], [3_000], [8_080], [65_535]])('should be true for %p', (value: unknown) => {
            expect(isNetworkPort(value, options)).toBeTrue()
        })
    })

    describe('with allow_system_allocated and allow_system_ports set to false', () => {
        const options = { allow_system_allocated: false, allow_system_ports: false }

        it.each<[number]>([[-1], [0], [80]])('should be false for %p', (value: unknown) => {
            expect(isNetworkPort(value, options)).toBeFalse()
        })

        it.each<[number]>([[3_000], [8_080], [65_535]])('should be true for %p', (value: unknown) => {
            expect(isNetworkPort(value, options)).toBeTrue()
        })
    })
})
