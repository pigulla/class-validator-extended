import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {ArrayContainsAnyOfOptions} from './array-contains-any-of.options'
import {arrayContainsAnyOf} from './array-contains-any-of.predicate'

export const ARRAY_CONTAINS_ANY_OF = 'arrayContainsAnyOf'

export function ArrayContainsAnyOf(
    items: Iterable<unknown>,
    validationOptions: Partial<ArrayContainsAnyOfOptions> & ValidationOptions = {}
) {
    const {count} = {count: 1, ...validationOptions}

    return ValidateBy(
        {
            name: ARRAY_CONTAINS_ANY_OF,
            validator: {
                validate: (value, _arguments): boolean => arrayContainsAnyOf(value, items, {count}),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must include at least ${count === 1 ? 'one' : count} of $constraint1`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
