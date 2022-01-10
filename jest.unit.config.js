/* eslint-disable @typescript-eslint/no-var-requires,unicorn/prefer-module */
const config = require('./jest.config')

module.exports = {
    ...config,
    coverageDirectory: 'coverage/unit',
    coveragePathIgnorePatterns: [...config.coveragePathIgnorePatterns, '\\.decorator\\.ts$'],
    testRegex: ['/test/unit/.*.spec.ts$'],
}
