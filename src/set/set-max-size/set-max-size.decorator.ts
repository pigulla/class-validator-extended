import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {setMaxSize} from './set-max-size.predicate'

export const SET_MAX_SIZE = 'setMaxSize'

export function SetMaxSize(max: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_MAX_SIZE,
            validator: {
                validate: (value, _arguments): boolean => setMaxSize(value, max),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
