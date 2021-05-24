import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {setNotContains} from './set-not-contains.predicate'

export const SET_NOT_CONTAINS = 'setNotContains'

export function SetNotContains(items: unknown[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_NOT_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => setNotContains(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not contain $constraint1 values`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
