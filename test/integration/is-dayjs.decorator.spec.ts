import 'jest-extended'
import {validateSync, ValidationError} from 'class-validator'
import dayjs = require('dayjs')

import {IS_DAYJS, IsDayjs} from '../../src'

class Test {
    @IsDayjs()
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

class TestEach {
    @IsDayjs({each: true})
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

class TestAllowInvalid {
    @IsDayjs({is_valid: false})
    public readonly value: unknown

    public constructor(value: unknown) {
        this.value = value
    }
}

describe('IsDayjs', () => {
    it.each<[string, unknown]>([['a valid Dayjs instance', dayjs('2020-07-20T08:12:58.536Z')]])(
        'should validate for %s',
        (_, value) => {
            const instance = new Test(value)
            expect(validateSync(instance)).toEqual([])
        }
    )

    it.each<[string, unknown]>([
        ['a Date instance', new Date('2021-05-22T08:00:00.000Z')],
        ['an invalid Dayjs instance', dayjs('2020-07-20T00:99:00.00Z')],
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
                [IS_DAYJS]: 'value must be a valid Dayjs instance',
            },
        })
    })

    it.each<[string, unknown]>([
        ['null', null],
        [
            'an array with an invalid Dayjs instance',
            [dayjs('2021-05-22T08:00:00.000Z'), dayjs('2020-07-20T00:99:00.00Z')],
        ],
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
                [IS_DAYJS]: 'each value in value must be a valid Dayjs instance',
            },
        })
    })

    it.each<[string, unknown]>([['a Date instance', new Date('2021-05-22T08:00:00.000Z')]])(
        'should not validate when allowing invalid instances for %s',
        (_, value) => {
            const instance = new TestAllowInvalid(value)
            const result = validateSync(instance)

            expect(result).toEqual([expect.any(ValidationError)])
            expect(result[0]).toMatchObject({
                children: [],
                property: 'value',
                target: instance,
                value: instance.value,
                constraints: {
                    [IS_DAYJS]: 'value must be a Dayjs instance',
                },
            })
        }
    )
})
