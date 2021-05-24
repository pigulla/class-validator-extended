import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {mapContainsKeys} from './map-contains-keys.predicate'

export const MAP_CONTAINS_KEYS = 'mapContainsKeys'

export function MapContainsKeys(items: unknown[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_CONTAINS_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapContainsKeys(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain $constraint1 keys`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
