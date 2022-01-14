// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['lcov', 'text'],
    coveragePathIgnorePatterns: ['<rootDir>/src/(.+/)*index.ts'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
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
        '^~test$': '<rootDir>/test/index.ts',
        '^~test/(.+)': '<rootDir>/test/$1',
    },
    setupFiles: ['jest-date-mock'],
    setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/test/setup.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}
