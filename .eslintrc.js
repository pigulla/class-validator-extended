module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['unicorn', 'prettier', '@typescript-eslint', '@typescript-eslint/eslint-plugin'],
    extends: [
        'eslint:recommended',
        'plugin:unicorn/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    settings: {
        parser: '@typescript-eslint/parser',
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
    env: {
        node: true,
    },
    rules: {
        'no-unused-vars': 'off',
        'prefer-arrow-callback': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
            },
        ],
        'unicorn/no-null': 'off',
        'unicorn/numeric-separators-style': [
            'error',
            {
                number: {
                    minimumDigits: 4,
                    groupLength: 3,
                },
            },
        ],
        'prettier/prettier': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
    },
}
