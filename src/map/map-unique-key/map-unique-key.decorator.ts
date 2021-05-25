import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator'

import {Selector} from './map-unique-key.options'
import {mapUniqueKey} from './map-unique-key.predicate'

export const MAP_UNIQUE_KEY = 'mapUniqueKey'

export function MapUniqueKey<T = unknown, P = unknown>(
    selector: Selector<T, P>,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: MAP_UNIQUE_KEY,
            validator: {
                validate: (value, _arguments): boolean => mapUniqueKey(value, selector),
                defaultMessage: buildMessage(
                    eachPrefix => `${eachPrefix}all $property's keys must be unique`,
                    validationOptions
                ),
            },
        },
        validationOptions
    )
}
