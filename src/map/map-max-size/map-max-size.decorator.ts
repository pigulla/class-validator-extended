import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {mapMaxSize} from './map-max-size.predicate'

export const MAP_MAX_SIZE = 'mapMaxSize'

export function MapMaxSize(max: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_MAX_SIZE,
            validator: {
                validate: (value, _arguments): boolean => mapMaxSize(value, max),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
