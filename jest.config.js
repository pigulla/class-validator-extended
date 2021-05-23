/* eslint-env node */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['clover', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 0,
        },
    },
    setupFilesAfterEnv: ['jest-extended'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
