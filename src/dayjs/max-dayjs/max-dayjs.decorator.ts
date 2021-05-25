import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'
import {ConfigType} from 'dayjs'

import {maxDayjs} from './max-dayjs.predicate'

export const MAX_DAYJS = 'maxDayjs'

export function MaxDayjs(max: ConfigType, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => maxDayjs(value, max),
                defaultMessage: buildMessage(
                    eachPrefix => `maximal allowed date for ${eachPrefix}$property is $constraint1`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
