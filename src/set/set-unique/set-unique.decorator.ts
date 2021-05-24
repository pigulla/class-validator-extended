import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {Selector} from './set-unique.options'
import {setUnique} from './set-unique.predicate'

export const SET_UNIQUE = 'setUnique'

export function SetUnique<T = unknown, P = unknown>(
    selector: Selector<T, P>,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: SET_UNIQUE,
            validator: {
                validate: (value, _arguments): boolean => setUnique(value, selector),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}All $property's keys must be unique`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
