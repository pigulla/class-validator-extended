import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'
import type {Dayjs} from 'dayjs'

import {minDayjs} from './min-dayjs.predicate'

export const MIN_DAYJS = 'minDayjs'

export function MinDayjs(min: Date | Dayjs, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => minDayjs(value, min),
                defaultMessage: buildMessage(
                    eachPrefix => `minimal allowed date for ${eachPrefix}$property is $constraint1`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
