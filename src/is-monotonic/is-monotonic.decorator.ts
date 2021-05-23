import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {IsMonotonicOptions} from './is-monotonic.options'
import {isMonotonic} from './is-monotonic.predicate'

export const IS_MONOTONIC = 'isMonotonic'

export function IsMonotonic<T>(validationOptions: IsMonotonicOptions<T> & ValidationOptions) {
    return ValidateBy(
        {
            name: IS_MONOTONIC,
            validator: {
                validate: (value, _arguments): boolean =>
                    isMonotonic(value, validationOptions.selector, validationOptions.monotonicity),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a ${validationOptions.monotonicity} array`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
