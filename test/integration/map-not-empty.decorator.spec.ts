import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'

import {MapNotEmpty, MAP_NOT_EMPTY} from '../../src'

class Test {
    @MapNotEmpty()
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

class TestEach {
    @MapNotEmpty({each: true})
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

describe('MapNotEmpty', () => {
    it.each<[string, unknown]>([
        ['a non-empty map', new Map([['foo', 'bar']])],
        ['a map with empty-looking values', new Map([[undefined, '']])],
    ])('should validate for %p', (_, value) => {
        const instance = new Test(value)
        expect(validateSync(instance)).toEqual([])
    })

    it.each<[string, unknown]>([
        ['an empty map', new Test(new Map())],
        ['an explicitly empty map', new Test(new Map([]))],
    ])('should not validate for %p', (_, value) => {
        const instance = new Test(value)
        const result = validateSync(instance)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'value',
            target: instance,
            value: instance.value,
            constraints: {
                [MAP_NOT_EMPTY]: 'value should not be an empty map',
            },
        })
    })

    it.each<[string, unknown]>([
        ['null', null],
        ['an an array with an empty empty map', [new Map()]],
    ])(`should not validate with 'each: true' for %s`, (_, value) => {
        const instance = new TestEach(value)
        const result = validateSync(instance)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'value',
            target: instance,
            value: instance.value,
            constraints: {
                [MAP_NOT_EMPTY]: 'each value in value should not be an empty map',
            },
        })
    })
})
