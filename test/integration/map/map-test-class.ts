import {Dayjs} from 'dayjs'
import dayjs = require('dayjs')

import {
    IsMap,
    MapContains,
    MapContainsKeys,
    MapMaxSize,
    MapMinSize,
    MapNotContains,
    MapNotContainsKeys,
    MapNotEmpty,
    MapUnique,
    MapUniqueKey,
} from '../../../src'

export class MapTestClass {
    @IsMap()
    isMap: unknown = new Map()

    @IsMap({each: true})
    eachIsMap: unknown = [new Map(), new Map()]

    @MapContains([42])
    mapContains: unknown = new Map([
        ['foo', 13],
        ['bar', 42],
    ])

    @MapContains([42], {each: true})
    eachMapContains: unknown = [
        new Map([
            ['foo', 13],
            ['bar', 42],
        ]),
        new Map([
            [1, 42],
            [2, 0],
        ]),
    ]

    @MapContainsKeys(['foo', 'bar'])
    mapContainsKeys: unknown = new Map([
        ['foo', 13],
        ['bar', 42],
    ])

    @MapContainsKeys(['foo', 'bar'], {each: true})
    eachMapContainsKeys: unknown = [
        new Map([
            ['foo', 13],
            ['bar', 42],
        ]),
        new Map([
            ['foo', 'the foo'],
            ['bar', 'le bar'],
            ['baz', 'das baz'],
        ]),
    ]

    @MapMaxSize(3)
    mapMaxSize: unknown = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ])

    @MapMaxSize(3, {each: true})
    eachMapMaxSize: unknown = [
        new Map([]),
        new Map([
            [1, 'one'],
            [2, 'two'],
            [3, 'three'],
        ]),
    ]

    @MapMinSize(2)
    mapMinSize: unknown = new Map([
        [true, 'truth'],
        [false, 'lie'],
    ])

    @MapMinSize(2, {each: true})
    eachMapMinSize: unknown = [
        new Map([
            [{}, 'uno'],
            [{}, 'dos'],
            [{}, 'tres'],
        ]),
        new Map([
            [new Date(), 'now'],
            [new Date(), 'later'],
        ]),
    ]

    @MapNotContains(['baz'])
    mapNotContains: unknown = new Map([
        ['foo', 13],
        ['bar', 42],
    ])

    @MapNotContains(['foo', 1], {each: true})
    eachMapNotContains: unknown = [
        new Map([
            ['foo', 13],
            ['bar', 42],
        ]),
        new Map([
            [1, 42],
            [2, 0],
        ]),
    ]

    @MapNotContainsKeys(['bam', 'bak'])
    mapNotContainsKeys: unknown = new Map([
        ['foo', 13],
        ['bar', 42],
    ])

    @MapNotContainsKeys([0, 13], {each: true})
    eachMapNotContainsKeys: unknown = [
        new Map([
            ['foo', 13],
            ['bar', 42],
        ]),
        new Map([
            [1, 42],
            [2, 0],
        ]),
    ]

    @MapNotEmpty()
    mapNotEmpty: unknown = new Map([['foo', 42]])

    @MapNotEmpty({each: true})
    eachMapNotEmpty: unknown = [
        new Map([
            ['foo', 42],
            ['bar', 13],
        ]),
        new Map([[1, 1]]),
    ]

    @MapUnique<number>(n => n)
    mapUnique: unknown = new Map([
        ['foo', 42],
        ['bar', 13],
    ])

    @MapUnique<Dayjs, string>(day => day.format('dddd'), {each: true})
    eachMapUnique: unknown = [
        new Map([
            ['day 1', dayjs('2020-05-01T00:00:00.000Z')],
            ['day 2', dayjs('2020-05-06T00:00:00.000Z')],
            ['day 3', dayjs('2020-05-07T00:00:00.000Z')],
        ]),
        new Map([]),
    ]

    @MapUniqueKey<Dayjs>(day => day.format('dddd'))
    mapUniqueKey: unknown = new Map([
        [dayjs('2020-05-01T00:00:00.000Z'), 42],
        [dayjs('2020-05-02T00:00:00.000Z'), 13],
    ])

    @MapUniqueKey<Dayjs, string>(day => day.format('dddd'), {each: true})
    eachMapUniqueKey: unknown = [
        new Map([
            [dayjs('2020-05-01T00:00:00.000Z'), 'Saturday'],
            [dayjs('2020-05-06T00:00:00.000Z'), 'Thursday'],
            [dayjs('2020-05-07T00:00:00.000Z'), 'Friday'],
        ]),
        new Map([]),
    ]

    constructor(fields: Partial<MapTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            if (Object.prototype.hasOwnProperty.call(this, k)) {
                this[k as keyof MapTestClass] = v
            }
        }
    }
}
