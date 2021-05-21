import {registerDecorator, ValidationArguments} from 'class-validator'

import {Monotonicity, Selector} from './is-monotonic.options'
import {isMonotonic} from './is-monotonic.predicate'

export const IS_MONOTONIC = 'isMonotonic'

export function IsMonotonic<T>(selector: Selector<T>, monotonicity: Monotonicity) {
    return (object: Object, propertyName: string): void => {
        registerDecorator({
            name: IS_MONOTONIC,
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
