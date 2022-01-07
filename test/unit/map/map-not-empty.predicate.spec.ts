import 'jest-extended'

import { mapNotEmpty } from '~'

describe('mapNotEmpty', () => {
    it.each([
        [new Map([[42, 'foo']])],
        [
            new Map<unknown, unknown>([
                ['bar', 'baz'],
                [42, 13],
            ]),
        ],
    ])('should be true for %p', value => {
        expect(mapNotEmpty(value)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [0], ['0'], [new Date('2020-07-20T08:12:58.536Z')], ['foo'], [new Map()]])(
        'should be false for %p',
        value => {
            expect(mapNotEmpty(value)).toBeFalse()
        }
    )
})
