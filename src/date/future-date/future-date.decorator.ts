import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {futureDate} from './future-date.predicate'

export const FUTURE_DATE = 'futureDate'

export function FutureDate(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: FUTURE_DATE,
            validator: {
                validate: (value, _arguments): boolean => futureDate(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Date instance in the future`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
