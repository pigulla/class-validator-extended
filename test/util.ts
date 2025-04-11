import assert from 'node:assert'
import { it, describe } from 'node:test'

import { validateSync, ValidationError } from 'class-validator'
import type { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions'
import { sprintf } from 'sprintf-js'

const validationOptions: ValidatorOptions = {
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    skipUndefinedProperties: false,
}

export function expectNoValidationErrors(instance: object): void {
    assert.deepEqual(validateSync(instance, validationOptions), [])
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export function expectValidationError<T extends Object>(
    instance: T,
    { property, constraint, message }: { property: keyof T; constraint: string; message: string }
): void {
    const errors = validateSync(instance, validationOptions)

    assert.strictEqual(errors.length, 1)
    assert(errors[0] instanceof ValidationError)
    assert.deepEqual(errors[0], {
        children: [],
        property,
        target: instance,
        value: instance[property],
        constraints: {
            [constraint]: message,
        },
    })
}

function formatName(name: string, testCase: unknown[]): string {
    const parameters = testCase.map(item => (item === '' ? '<empty string>' : item))

    return sprintf(name, ...parameters)
}

export function describeEach<T extends unknown[] = unknown[]>(
    testCases: T[]
): (name: string, callback: (...parameters: T) => void) => void {
    return (name: string, callback: (...parameters: T) => void): void => {
        for (const testCase of testCases) {
            void describe(formatName(name, testCase), () => callback(...testCase))
        }
    }
}

export function itEach<T extends unknown[] = unknown[]>(
    testCases: T[]
): (name: string, callback: (...parameters: T) => void) => void {
    return (name: string, callback: (...parameters: T) => void): void => {
        for (const testCase of testCases) {
            void it(formatName(name, testCase), () => callback(...testCase))
        }
    }
}
