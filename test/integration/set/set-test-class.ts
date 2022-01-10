import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { IsSet, SetContains, SetMaxSize, SetMinSize, SetNotContains, SetNotEmpty, SetUnique } from '~'

export class SetTestClass {
    @IsSet()
    isSet: unknown = new Set(['foo'])

    @IsSet({ each: true })
    eachIsSet: unknown = [new Set([1, 3, 5]), new Set([]), new Set([1, 1])]

    @SetContains([42, 13])
    setContains: unknown = new Set([1, 4, 42, 12, 13, 0])

    @SetContains(['42'], { each: true })
    eachSetContains: unknown = [new Set(['4', '2', '42']), new Set(['42']), new Set(['foo', 'bar', '42'])]

    @SetMaxSize(2)
    setMaxSize: unknown = new Set([1, 2])

    @SetMaxSize(1, { each: true })
    eachSetMaxSize: unknown = [new Set([]), new Set(), new Set([99])]

    @SetMinSize(1)
    setMinSize: unknown = new Set([1])

    @SetMinSize(1, { each: true })
    eachSetMinSize: unknown = [new Set([1, 2, 3]), new Set(['foo']), new Set(['bar', 'baz'])]

    @SetNotContains([13])
    setNotContains: unknown = new Set([1, 2, 12, 14])

    @SetNotContains([7, 13], { each: true })
    eachSetNotContains: unknown = [new Set([1, 2, 5]), new Set([6, 8, 12, 14]), new Set([])]

    @SetNotEmpty()
    setNotEmpty: unknown = new Set([false])

    @SetNotEmpty({ each: true })
    eachSetNotEmpty: unknown = [new Set([null]), new Set([0, undefined]), new Set([false])]

    @SetUnique<Dayjs>(date => date.format('dddd'))
    setUnique: unknown = new Set([
        dayjs('2020-05-01T00:00:00.000Z'),
        dayjs('2020-05-06T00:00:00.000Z'),
        dayjs('2020-05-07T00:00:00.000Z'),
    ])

    @SetUnique<Dayjs>(date => date.format('dddd'), { each: true })
    eachSetUnique: unknown = [
        new Set([
            dayjs('2020-05-01T00:00:00.000Z'),
            dayjs('2020-05-06T00:00:00.000Z'),
            dayjs('2020-05-07T00:00:00.000Z'),
        ]),
        new Set([]),
    ]

    constructor(fields: Partial<SetTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof SetTestClass] = v
        }
    }
}
