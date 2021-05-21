import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {setNotEmpty} from './set-not-empty.predicate'

export const SET_NOT_EMPTY = 'setNotEmpty'

export function SetNotEmpty(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_NOT_EMPTY,
            validator: {
                validate: (value, _arguments): boolean => setNotEmpty(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not be empty`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
