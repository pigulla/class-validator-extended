/* eslint-disable @typescript-eslint/no-var-requires,unicorn/prefer-module */
const config = require('./jest.config')

module.exports = {
    ...config,
    collectCoverageFrom: ['src/**/*.decorator.ts'],
    coverageDirectory: 'coverage/integration',
    testRegex: ['/test/integration/.*.spec.ts$'],
}
