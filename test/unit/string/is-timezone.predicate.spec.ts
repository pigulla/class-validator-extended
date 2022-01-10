import 'jest-extended'

import { isTimezone } from '~'

import SpyInstance = jest.SpyInstance

describe('isTimezone', () => {
    describe('when an unexpected error occurs', () => {
        let CtorMock: SpyInstance

        beforeEach(() => {
            CtorMock = jest.spyOn(Intl, 'DateTimeFormat')
        })

        afterEach(() => {
            CtorMock.mockRestore()
        })

        it('should pass it through', () => {
            const error = new Error('Boom!')

            CtorMock.mockImplementation(() => {
                throw error
            })
            expect(() => isTimezone('Europe/Berlin')).toThrow(error)
        })
    })

    it.each([['Europe/Berlin'], ['europe/berlin'], ['UTC'], ['utc']])('should be true for %p', value => {
        expect(isTimezone(value)).toBeTrue()
    })

    it.each([[null], [undefined], [''], ['default'], ['Europe']])('should be false for %p', value => {
        expect(isTimezone(value)).toBeFalse()
    })
})
