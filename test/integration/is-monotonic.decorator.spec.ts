import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'
import {ValidatorOptions} from 'class-validator/types/validation/ValidatorOptions'

import {IS_MONOTONIC, IsMonotonic, Monotonicity} from '../../src'

class Test {
    @IsMonotonic<Date>(item => item.valueOf(), Monotonicity.STRICTLY_INCREASING)
    public readonly values: readonly Date[]

    public constructor(values: readonly Date[]) {
        this.values = values
    }
}

const validatorOptions: ValidatorOptions = {
    forbidUnknownValues: true,
}

describe('IsMonotonic', () => {
    it.each<[string, Test]>([
        ['an empty array', new Test([])],
        [
            'a sorted array',
            new Test([
                new Date('2021-05-21T07:00:00.000Z'),
                new Date('2021-05-22T08:00:00.000Z'),
                new Date('2021-05-23T09:00:00.000Z'),
            ]),
        ],
    ])('should validate for %p', (_, test) => {
        expect(validateSync(test, validatorOptions)).toEqual([])
    })

    it.each<[string, Test]>([
        [
            'an unsorted array',
            new Test([
                new Date('2021-05-22T08:00:00.000Z'),
                new Date('2021-05-21T07:00:00.000Z'),
                new Date('2021-05-23T09:00:00.000Z'),
            ]),
        ],
    ])('should not validate for %p', (_, test) => {
        const result = validateSync(test, validatorOptions)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'values',
            target: test,
            value: test.values,
            constraints: {
                [IS_MONOTONIC]: expect.toBeString(),
            },
        })
    })
})
