import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {setContains} from './set-contains.predicate'

export const SET_CONTAINS = 'setContains'

export function SetContains(items: unknown[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => setContains(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 values`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
