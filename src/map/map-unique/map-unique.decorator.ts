import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {Selector} from './map-unique.options'
import {mapUnique} from './map-unique.predicate'

export const MAP_UNIQUE = 'mapUnique'

export function MapUnique<T = unknown, P = T>(
    selector: Selector<T, P>,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_UNIQUE,
            validator: {
                validate: (value, _arguments): boolean => mapUnique(value, selector),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}all $property's values must be unique`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
