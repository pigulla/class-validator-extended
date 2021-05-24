import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {isMap} from './is-map.predicate'

export const IS_MAP = 'isMap'

export function IsMap(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_MAP,
            validator: {
                validate: (value, _arguments): boolean => isMap(value),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must be a Map instance`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
