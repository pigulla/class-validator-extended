import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {pastDayjs} from './past-dayjs.predicate'

export const PAST_DAYJS = 'pastDayjs'

export function PastDayjs(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: PAST_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => pastDayjs(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Dayjs instance in the past`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
