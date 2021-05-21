import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'
import {ValidatorOptions} from 'class-validator/types/validation/ValidatorOptions'

import {SetNotEmpty, SET_NOT_EMPTY} from '../../src'

class Test {
    @SetNotEmpty()
    public readonly value: ReadonlySet<unknown>

    public constructor(value: ReadonlySet<unknown>) {
        this.value = value
    }
}

const validatorOptions: ValidatorOptions = {
    forbidUnknownValues: true,
}

describe('NonEmptySet', () => {
    it.each<[string, Test]>([
        ['a non-empty set', new Test(new Set(['foo']))],
        ['a set with empty-looking values', new Test(new Set([0, '', false]))],
    ])('should validate for %p', (_, test) => {
        expect(validateSync(test, validatorOptions)).toEqual([])
    })

    it.each<[string, Test]>([
        ['an empty set', new Test(new Set())],
        ['an explicitly empty set', new Test(new Set([]))],
    ])('should not validate for %p', (_, test) => {
        const result = validateSync(test, validatorOptions)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'value',
            target: test,
            value: test.value,
            constraints: {
                [SET_NOT_EMPTY]: expect.toBeString(),
            },
        })
    })
})
