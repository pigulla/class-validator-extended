const regExp = /^[a-z]{2}-[a-z]+-([1-9]|1\d)$/

export function isAwsRegion(input: unknown): input is string {
    return typeof input === 'string' && regExp.test(input)
}
