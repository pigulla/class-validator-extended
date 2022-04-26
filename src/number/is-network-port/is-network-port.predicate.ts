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

    const { allow_system_allocated, allow_system_ports } = {
        allow_system_allocated: true,
        allow_system_ports: true,
        ...options,
    }

    return (
        value <= 65_535 &&
        value >= (allow_system_allocated ? 0 : 1) &&
        ((allow_system_allocated && value === 0) || allow_system_ports || value >= 1_024)
    )
}
