import 'jest-extended'

import { isMap } from '~'

describe('isMap', () => {
    it.each<[unknown]>([
        [new Map()],
        [
            new Map([
                [42, 'fourtytwo'],
                [13, 'thirteen'],
            ]),
        ],
    ])('should be true for %p', (value: unknown) => {
        expect(isMap(value)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [{}], [[]], [new Set()], [new WeakMap()]])(
        'should be false for %p',
        (value: unknown) => {
            expect(isMap(value)).toBeFalse()
        }
    )
})
