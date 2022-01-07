import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator'

import { mapMaxSize } from './map-max-size.predicate'

/** @hidden */
export const MAP_MAX_SIZE = 'mapMaxSize'

/**
 * @category Map
 */
export function MapMaxSize(maximum: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_MAX_SIZE,
            validator: {
                validate: (value, _arguments): boolean => mapMaxSize(value, maximum),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}$property must contain not more than $constraint1 elements`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
