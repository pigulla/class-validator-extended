import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {arrayContainsAnyOf} from './array-contains-any-of.predicate'

export const ARRAY_CONTAINS_ANY_OF = 'arrayContainsAnyOf'

export function ArrayContainsAnyOf(items: Iterable<unknown>, validationOptions?: ValidationOptions) {
    return ValidateBy(
        {
            name: ARRAY_CONTAINS_ANY_OF,
            validator: {
                validate: (value, _arguments): boolean => arrayContainsAnyOf(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must include at least one of $constraint1`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
