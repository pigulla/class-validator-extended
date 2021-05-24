import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {InvariantCallback} from './array-invariant.options'
import {arrayInvariant} from './array-invariant.predicate'

export const ARRAY_INVARIANT = 'arrayInvariant'

export function ArrayInvariant<T>(callback: InvariantCallback<T>, validationOptions?: ValidationOptions) {
    return ValidateBy(
        {
            name: ARRAY_INVARIANT,
            validator: {
                validate: (value, _arguments): boolean => arrayInvariant(value, callback),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must satisfy the defined invariant`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
