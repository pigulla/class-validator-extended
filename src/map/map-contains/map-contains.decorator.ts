import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {mapContains} from './map-contains.predicate'

export const MAP_CONTAINS = 'mapContains'

export function MapContains(items: unknown[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => mapContains(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 values`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
