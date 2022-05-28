import 'jest-extended'

import { isSubclass } from '~'

class A {}

abstract class B extends A {}

class C extends B {}

class O {}

describe('isSubclass', () => {
    it.each<[unknown]>([[new C()]])('should be true for %p', (value: unknown) => {
        expect(isSubclass(value, B)).toBeTrue()
    })

    it.each<[unknown]>([[undefined], [null], [{}], [O], [A], [new A()], [B], [new O()]])(
        'should be false for %p',
        (value: unknown) => {
            expect(isSubclass(value, B)).toBeFalse()
        }
    )
})
