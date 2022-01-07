import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapContains } from './map-contains.predicate'

/** @hidden */
export const MAP_CONTAINS = 'mapContains'

/**
 * @category Map
 */
export function MapContains<T = unknown>(items: T[], validationOptions?: ValidationOptions): PropertyDecorator {
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
