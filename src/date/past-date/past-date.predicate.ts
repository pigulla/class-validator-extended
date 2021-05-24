export function pastDate(value: unknown): boolean {
    return value instanceof Date && value.getTime() < Date.now()
}
