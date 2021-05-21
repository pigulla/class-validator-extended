import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'
import {ValidatorOptions} from 'class-validator/types/validation/ValidatorOptions'

import {MapNotEmpty, MAP_NOT_EMPTY} from '../../src'

class Test {
    @MapNotEmpty()
    public readonly value: ReadonlyMap<unknown, unknown>

    public constructor(value: ReadonlyMap<unknown, unknown>) {
        this.value = value
    }
}

const validatorOptions: ValidatorOptions = {
    forbidUnknownValues: true,
}

describe('NonEmptyMap', () => {
    it.each<[string, Test]>([
        ['a non-empty map', new Test(new Map([['foo', 'bar']]))],
        ['a map with empty-looking values', new Test(new Map([[undefined, '']]))],
    ])('should validate for %p', (_, test) => {
        expect(validateSync(test, validatorOptions)).toEqual([])
    })

    it.each<[string, Test]>([
        ['an empty map', new Test(new Map())],
        ['an explicitly empty map', new Test(new Map([]))],
    ])('should not validate for %p', (_, test) => {
        const result = validateSync(test, validatorOptions)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'value',
            target: test,
            value: test.value,
            constraints: {
                [MAP_NOT_EMPTY]: expect.toBeString(),
            },
        })
    })
})
