import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {futureDayjs} from './future-dayjs.predicate'

export const FUTURE_DAYJS = 'futureDayjs'

export function FutureDayjs(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: FUTURE_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => futureDayjs(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Dayjs instance in the future`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
