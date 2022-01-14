const integerRegex = /^0|[1-9]\d$/

/**
 * @category Predicates
 * @param value The value to validate.
 * @param options Additional options (see {@link IsNetworkPort}).
 */
export function isNetworkPort(
    value: unknown,
    options?: { allow_system_allocated?: boolean; allow_system_ports?: boolean }
): value is number {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || !integerRegex.test(String(value))) {
        return false
    }

    const port = value as number
    const { allow_system_allocated, allow_system_ports } = {
        allow_system_allocated: true,
        allow_system_ports: true,
        ...options,
    }

    return (
        port <= 65_535 &&
        value >= (allow_system_allocated ? 0 : 1) &&
        ((allow_system_allocated && port === 0) || allow_system_ports || port >= 1_024)
    )
}
