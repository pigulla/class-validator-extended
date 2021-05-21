/* eslint-env node */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['text', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: -1000,
        },
    },
    setupFilesAfterEnv: ['jest-extended'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
