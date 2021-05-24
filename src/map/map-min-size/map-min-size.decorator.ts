import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {mapMinSize} from './map-min-size.predicate'

export const MAP_MIN_SIZE = 'mapMinSize'

export function MapMinSize(min: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_MIN_SIZE,
            validator: {
                validate: (value, _arguments): boolean => mapMinSize(value, min),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain at least $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
