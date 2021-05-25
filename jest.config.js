/* eslint-env node */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
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
    setupFiles: ['jest-date-mock'],
    setupFilesAfterEnv: ['jest-extended'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
