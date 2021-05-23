export type IsDayjsOptions = {
    is_valid: boolean
}

export const defaultOptions: Pick<IsDayjsOptions, 'is_valid'> = {
    is_valid: true,
}

export function optionsWithDefaults(options: Partial<IsDayjsOptions>): IsDayjsOptions {
    return {...defaultOptions, ...options}
}
