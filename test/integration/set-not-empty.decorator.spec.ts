import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'

import {SetNotEmpty, SET_NOT_EMPTY} from '../../src'

class Test {
    @SetNotEmpty()
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

class TestEach {
    @SetNotEmpty({each: true})
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

describe('SetNotEmpty', () => {
    it.each<[string, unknown]>([
        ['a non-empty set', new Set(['foo'])],
        ['a set with empty-looking values', new Set([0, '', false])],
    ])('should validate for %s', (_, values) => {
        const instance = new Test(values)
        expect(validateSync(instance)).toEqual([])
    })

    it.each<[string, unknown]>([
        ['an empty set', new Set()],
        ['an explicitly empty set', new Set([])],
    ])('should not validate for %s', (_, value) => {
        const instance = new Test(value)
        const result = validateSync(instance)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'value',
            target: instance,
            value: instance.value,
            constraints: {
                [SET_NOT_EMPTY]: 'value should not be an empty set',
            },
        })
    })

    it.each<[string, unknown]>([
        ['null', null],
        ['an an array with an empty empty set', [new Set()]],
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
                [SET_NOT_EMPTY]: 'each value in value should not be an empty set',
            },
        })
    })
})
