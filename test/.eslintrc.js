/* eslint-disable unicorn/prefer-module,@typescript-eslint/no-var-requires */
const path = require('path')

const config = require('../.eslintrc')

module.exports = {
    ...config,
    env: { ...config.env, jest: true },
    parserOptions: {
        project: ['./test/tsconfig.json'],
    },
    settings: {
        ...config.settings,
        'import/resolver': {
            typescript: {
                // IntelliJ wants './tsconfig.json' here whereas './test/tsconfig.json' is required when running the
                // ESLint CLI directly... not sure what's going on there, so hence this workaround.
                project: path.join(__dirname, 'tsconfig.json'),
            },
        },
    },
    rules: {
        ...config.rules,
        'unicorn/consistent-function-scoping': 'off',
        'jest/expect-expect': [
            'warn',
            { assertFunctionNames: ['expect', 'expectValidationError', 'expectNoValidationErrors'] },
        ],
    },
}
