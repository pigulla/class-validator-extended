import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'

import {ARRAY_MONOTONIC, ArrayMonotonic, Monotonicity} from '../../src'

class Test {
    @ArrayMonotonic<Date>({selector: item => item.valueOf(), monotonicity: Monotonicity.STRICTLY_INCREASING})
    public readonly values: unknown

    public constructor(values: unknown) {
        this.values = values
    }
}

class TestEach {
    @ArrayMonotonic<Date>({
        selector: item => item.valueOf(),
        monotonicity: Monotonicity.STRICTLY_INCREASING,
        each: true,
    })
    public readonly values: unknown

    public constructor(values: unknown) {
        this.values = values
    }
}

describe('ArrayMonotonic', () => {
    it.each<[string, unknown[]]>([
        ['an empty array', []],
        [
            'a sorted array',
            [
                new Date('2021-05-21T07:00:00.000Z'),
                new Date('2021-05-22T08:00:00.000Z'),
                new Date('2021-05-23T09:00:00.000Z'),
            ],
        ],
    ])('should validate for %s', (_, values) => {
        const instance = new Test(values)
        expect(validateSync(instance)).toEqual([])
    })

    it.each<[string, unknown]>([
        [
            'an unsorted array',
            [
                new Date('2021-05-22T08:00:00.000Z'),
                new Date('2021-05-21T07:00:00.000Z'),
                new Date('2021-05-23T09:00:00.000Z'),
            ],
        ],
    ])('should not validate for %s', (_, values) => {
        const instance = new Test(values)
        const result = validateSync(instance)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'values',
            target: instance,
            value: instance.values,
            constraints: {
                [ARRAY_MONOTONIC]: 'values must be a strictly increasing array',
            },
        })
    })

    it.each<[string, unknown]>([
        ['null', null],
        [
            'an an array with an unsorted array',
            [
                new Date('2021-05-22T08:00:00.000Z'),
                new Date('2021-05-21T07:00:00.000Z'),
                new Date('2021-05-23T09:00:00.000Z'),
            ],
        ],
    ])(`should not validate with 'each: true' for %s`, (_, values) => {
        const instance = new TestEach(values)
        const result = validateSync(instance)

        expect(result).toEqual([expect.any(ValidationError)])
        expect(result[0]).toMatchObject({
            children: [],
            property: 'values',
            target: instance,
            value: instance.values,
            constraints: {
                [ARRAY_MONOTONIC]: 'each value in values must be a strictly increasing array',
            },
        })
    })
})
