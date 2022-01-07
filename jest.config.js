/* eslint-env node */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    collectCoverage: true,
    coverageReporters: ['clover', 'text'],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/(.+/)*index.ts'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 0,
        },
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/test/tsconfig.json',
        },
    },
    moduleNameMapper: {
        '^~$': '<rootDir>/src/index.ts',
        '^~/(.+)': '<rootDir>/src/$1',
    },
    setupFiles: ['jest-date-mock'],
    setupFilesAfterEnv: ['jest-extended/all'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
