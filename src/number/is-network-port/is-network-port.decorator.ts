import type { ValidationOptions } from 'class-validator'
import { buildMessage, ValidateBy } from 'class-validator'

import { isNetworkPort } from './is-network-port.predicate'

function message({
    allow_system_allocated,
    allow_system_ports,
}: {
    allow_system_allocated: boolean
    allow_system_ports: boolean
}): string {
    return `${allow_system_allocated ? 'a' : 'a static'}${allow_system_ports ? '' : ' non-system'} network port`
}

/** @hidden */
export const IS_NETWORK_PORT = 'isNetworkPort'

/**
 * Checks if the given value is a valid port number.
 *
 * This is similar to the built-in `@IsPort` except that it requires the value to be a number (not a string).
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a valid network port (but not 0).
 * @IsNetworkPort({ allow_system_allocated: false })
 * remotePort: number
 * ```
 *
 * @category Number
 * @param options
 * Accepts the following options (in addition to generic class-validator options):
 *   - `allow_system_allocated: boolean = true`
 *     If true, allow port 0 (system allocated).
 *   - `allow_system_ports: boolean = true`
 *     If true, allow ports below 1024.
 */
export function IsNetworkPort(
    options?: {
        allow_system_allocated?: boolean
        allow_system_ports?: boolean
    } & ValidationOptions,
): PropertyDecorator {
    const { allow_system_allocated, allow_system_ports } = {
        allow_system_allocated: true,
        allow_system_ports: true,
        ...options,
    }

    return ValidateBy(
        {
            name: IS_NETWORK_PORT,
            validator: {
                validate: (value, _arguments): boolean =>
                    isNetworkPort(value, {
                        allow_system_allocated,
                        allow_system_ports,
                    }),
                defaultMessage: buildMessage(
                    eachPrefix =>
                        `${eachPrefix}$property must be ${message({
                            allow_system_allocated,
                            allow_system_ports,
                        })}`,
                    options,
                ),
            },
        },
        options,
    )
}
