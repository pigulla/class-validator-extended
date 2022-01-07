import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapNotContainsKeys } from './map-not-contains-keys.predicate'

/** @hidden */
export const MAP_NOT_CONTAINS_KEYS = 'mapNotContainsKeys'

/**
 * @category Map
 */
export function MapNotContainsKeys<T = unknown>(items: T[], validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_NOT_CONTAINS_KEYS,
            validator: {
                validate: (value, _arguments): boolean => mapNotContainsKeys(value, items),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property should not contain $constraint1 keys`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
