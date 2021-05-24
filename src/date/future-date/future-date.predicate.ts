export function futureDate(value: unknown): boolean {
    return value instanceof Date && value.getTime() > Date.now()
}
