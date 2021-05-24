import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {pastDate} from './past-date.predicate'

export const PAST_DATE = 'pastDate'

export function PastDate(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: PAST_DATE,
            validator: {
                validate: (value, _arguments): boolean => pastDate(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Date instance in the past`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
