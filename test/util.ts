import 'jest-extended'
import { validateSync, ValidationError } from 'class-validator'
import type { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions'

const validationOptions: ValidatorOptions = {
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    skipUndefinedProperties: false,
}

export function expectNoValidationErrors(instance: object): void {
    expect(validateSync(instance, validationOptions)).toEqual([])
}

export function expectValidationError<T extends Object>(
    instance: T,
    { property, constraint, message }: { property: keyof T; constraint: string; message: string }
): void {
    const errors = validateSync(instance, validationOptions)

    expect(errors).toEqual([expect.any(ValidationError)])
    expect(errors[0]).toMatchObject({
        children: [],
        property,
        target: instance,
        value: instance[property],
        constraints: {
            [constraint]: message,
        },
    })
}
