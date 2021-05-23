import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {IsDayjsOptions, optionsWithDefaults} from './is-dayjs.options'
import {isDayjs} from './is-dayjs.predicate'

export const IS_DAYJS = 'isDayjs'

export function IsDayjs(validationOptions: Partial<IsDayjsOptions> & ValidationOptions = {}): PropertyDecorator {
    const decoratorOptions = optionsWithDefaults(validationOptions)

    return ValidateBy(
        {
            name: IS_DAYJS,
            validator: {
                validate: (value, _arguments): boolean => isDayjs(value, decoratorOptions),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${decoratorOptions.is_valid ? 'a valid' : 'a'} Dayjs instance`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
