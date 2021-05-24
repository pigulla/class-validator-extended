import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {setMinSize} from './set-min-size.predicate'

export const SET_MIN_SIZE = 'setMinSize'

export function SetMinSize(min: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_MIN_SIZE,
            validator: {
                validate: (value, _arguments): boolean => setMinSize(value, min),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
