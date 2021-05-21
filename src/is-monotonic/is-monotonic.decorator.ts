import {registerDecorator, ValidationArguments} from 'class-validator'

import {Monotonicity, Selector} from './is-monotonic.options'
import {isMonotonic} from './is-monotonic.predicate'

const monotonicityValues = new Set(Object.values(Monotonicity))

export function IsMonotonic<T>(selector: Selector<T>, monotonicity: Monotonicity) {
    if (!monotonicityValues.has(monotonicity)) {
        throw new TypeError(`Unknown monotonicity type "${monotonicity}"`)
    }

    return (object: Object, propertyName: string): void => {
        registerDecorator({
            name: 'IsMonotonic',
            target: object.constructor,
            propertyName,
            validator: {
                validate(values: T[], _arguments: ValidationArguments) {
                    return isMonotonic(values, selector, monotonicity)
                },
            },
        })
    }
}
