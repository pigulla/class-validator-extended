import 'jest-extended'

import {arrayContainsAnyOf} from '../../../src'
import {ArrayContainsAnyOfOptions} from '../../../src/array/array-contains-any-of/array-contains-any-of.options'

describe('arrayContainsAnyOf', () => {
    it.each<[unknown]>([[Number.POSITIVE_INFINITY], [Number.NaN], [null], ['']])(
        'should throw for %p as a maxValue',
        count => {
            expect(() => arrayContainsAnyOf([], [], {count: count as number})).toThrow(TypeError)
        }
    )

    it.each<[unknown[], Iterable<unknown>, Partial<ArrayContainsAnyOfOptions>?]>([
        [
            [1, 2, 3],
            [1, 4, 8],
        ],
        [['42'], ['42']],
        [['42'], new Set(['42'])],
        [[1, 2, 3], new Set([1, 4, 8])],
        [[1, 4, 8], new Set([1, 4, 8])],
        [[1, 4, 8], new Set([1, 4, 8]), {}],
        [[1, 4, 8], new Set([1, 4, 8]), {count: 1}],
        [[1, 4, 8], new Set([1, 4, 8]), {count: 2}],
        [[1, 4, 8], new Set([1, 4, 8]), {count: 3}],
        [[1, 4, 8], new Set([1, 4, 8]), {count: 4}],
    ])('should be true for %p with values %p', (value, items) => {
        expect(arrayContainsAnyOf(value, items)).toBeTrue()
    })

    it.each<[unknown, Iterable<unknown>, Partial<ArrayContainsAnyOfOptions>?]>([
        [null, []],
        [undefined, []],
        [new Set(), []],
        [[1, 2, 3], []],
        [[1, 2, 3], new Set()],
        [[1, 2, 3], [4]],
        [[1, 2, 3], [4], {count: 2}],
    ])('should be false for %p with values %p', (values, items) => {
        expect(arrayContainsAnyOf(values, items)).toBeFalse()
    })
})
