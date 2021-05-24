import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {ArrayMonotonicOptions} from './array-monotonic.options'
import {arrayMonotonic} from './array-monotonic.predicate'

export const ARRAY_MONOTONIC = 'arrayMonotonic'

export function ArrayMonotonic<T>(validationOptions: ArrayMonotonicOptions<T> & ValidationOptions) {
    return ValidateBy(
        {
            name: ARRAY_MONOTONIC,
            validator: {
                validate: (value, _arguments): boolean => arrayMonotonic(value, validationOptions),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a ${validationOptions.monotonicity} array`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
