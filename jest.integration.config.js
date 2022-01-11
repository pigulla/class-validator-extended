/* eslint-disable @typescript-eslint/no-var-requires,unicorn/prefer-module */
const config = require('./jest.config')

module.exports = {
    ...config,
    coverageDirectory: 'coverage/integration',
    coveragePathIgnorePatterns: [...config.coveragePathIgnorePatterns, '\\.predicate\\.ts$'],
    testRegex: ['/test/integration/.*.spec.ts$'],
}
