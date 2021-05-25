import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {isTimezone} from './is-timezone.predicate'

export const IS_TIMEZONE = 'isTimezone'

export function IsTimezone(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_TIMEZONE,
            validator: {
                validate: (value, _arguments): boolean => isTimezone(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a valid timezone string`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
