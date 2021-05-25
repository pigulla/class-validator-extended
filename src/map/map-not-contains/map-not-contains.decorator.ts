import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {mapNotContains} from './map-not-contains.predicate'

export const MAP_NOT_CONTAINS = 'mapNotContains'

export function MapNotContains<T = unknown>(items: T[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_CONTAINS,
            validator: {
                validate: (value, _arguments): boolean => mapNotContains(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not contain $constraint1 values`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
