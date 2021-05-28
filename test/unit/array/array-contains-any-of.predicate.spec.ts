import 'jest-extended'

import {arrayContainsAnyOf} from '../../../src'

describe('arrayContainsAnyOf', () => {
    it.each<[unknown[], Iterable<unknown>]>([
        [
            [1, 2, 3],
            [1, 4, 8],
        ],
        [['42'], ['42']],
        [['42'], new Set(['42'])],
        [[1, 2, 3], new Set([1, 4, 8])],
        [[1, 4, 8], new Set([1, 4, 8])],
    ])('should be true for %p with values %p', (value, items) => {
        expect(arrayContainsAnyOf(value, items)).toBeTrue()
    })

    it.each<[unknown, Iterable<unknown>]>([
        [null, []],
        [undefined, []],
        [new Set(), []],
        [[1, 2, 3], []],
        [[1, 2, 3], new Set()],
        [[1, 2, 3], [4]],
    ])('should be false for %p with values %p', (values, items) => {
        expect(arrayContainsAnyOf(values, items)).toBeFalse()
    })
})
