[![npm](https://img.shields.io/npm/v/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://www.npmjs.com/package/class-validator-extended)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/pigulla/class-validator-extended/Node.js%20CI?style=flat-square&cacheSeconds=3600)](https://github.com/pigulla/class-validator-extended/actions?query=branch%3Amain)
[![GitHub Issues](https://img.shields.io/github/issues-raw/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://github.com/pigulla/class-validator-extended/issues)
[![requires.io](https://img.shields.io/requires/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://requires.io/github/pigulla/class-validator-extended/requirements/?branch=main)
[![Codecov](https://img.shields.io/codecov/c/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://app.codecov.io/gh/pigulla/class-validator-extended)
[![npm bundle size](https://img.shields.io/bundlephobia/min/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://bundlephobia.com/package/class-validator-extended)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://snyk.io/advisor/npm-package/class-validator-extended)

# class-validator-extended

> Additional decorator and non-decorator based validation for [class-validator](https://github.com/typestack/class-validator).

- ✅ Thoroughly tested
- ✅ Well documented
- ✅ No additional dependencies ([Day.js](https://day.js.org/) is supported but optional)
- ✅ Uses [Semantic Versioning](https://semver.org/) and keeps a [nice](https://keepachangelog.com/en/1.0.0/) [Changelog](CHANGELOG.md)

## Validation decorators

For detailed information please read the [API docs](https://pigulla.github.io/class-validator-extended/modules.html).

| Decorator                                  | Description                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Type**                                   |                                                                                                             |
| `@IsBigInt(options?)`                      | Checks if the given value is a BigInt.                                                                      |
| `@IsDayjs(options?)`                       | Checks if the given value is a Dayjs object.                                                                |
| `@IsDuration(options?)`                    | Checks if the given value is a Dayjs Duration object.                                                       |
| `@IsMap(options?)`                         | Checks if the given value is a Map.                                                                         |
| `@IsSet(options?)`                         | Checks if the given value is a Set.                                                                         |
| **Array**                                  |                                                                                                             |
| `@ArrayMonotonic(options?)`                | Checks if the given value is an array sorted in either (strictly) ascending or (strictly) descending order. |
| **BigInt**                                 |                                                                                                             |
| `@MaxBigInt(maximum, options?)`            | Checks if the given value is a BigInt not greater than `maximum`.                                           |
| `@MinBigInt(minimum, options?)`            | Checks if the given value is a BigInt not less than `minimum`.                                              |
| `@NegativeBigInt(options?)`                | Checks if the given value is a BigInt less than zero.                                                       |
| `@PositiveBigInt(options?)`                | Checks if the given value is a BigInt greater than zero.                                                    |
| **Date**                                   |                                                                                                             |
| `@FutureDate(options?)`                    | Checks if the given value is a Date object in the future.                                                   |
| `@PastDate(options?)`                      | Checks if the given value is a Date object in the past.                                                     |
| **Dayjs**                                  |                                                                                                             |
| `@FutureDayjs(options?)`                   | Checks if the given value is a Dayjs object in the future.                                                  |
| `@MaxDayjs(maximum. options?)`             | Checks if the given value is a Dayjs object not later than `maximum`.                                       |
| `@MinDayjs(minimum, options?)`             | Checks if the given value is a Dayjs object not earlier than `minimum`.                                     |
| `@PastDayjs(options?)`                     | Checks if the given value is a Dayjs object in the past.                                                    |
| **Map**                                    |                                                                                                             |
| `@MapContains(required, options?)`         | Checks if the given value is a Map and contains all `required` values.                                      |
| `@MapContainsKeys(required, options?)`     | Checks if the given value is a Map and contains all `required` keys.                                        |
| `@MapMaxSize(maximum, options?)`           | Checks if the given value is a Map with no more than `maximum` entries.                                     |
| `@MapMinSize(minimum, options?)`           | Checks if the given value is a Map with no fewer than `minimum` entries.                                    |
| `@MapNotContains(forbidden, options?)`     | Checks if the given value is a Map which does not contain any of the `forbidden` values.                    |
| `@MapNotContainsKeys(forbidden, options?)` | Checks if the given value is a Map which does not contain any of the `forbidden` keys.                      |
| `@MapNotEmpty(options?)`                   | Checks if the given value is a Map with at least one entry.                                                 |
| `@MapUnique(projection, options?)`         | Checks if the given value is a Map without duplicates with regard to the given `projection`.                |
| `@MapUniqueKeys(projection, options?)`     | Checks if the given value is a Map whose keys are all unique with regard to the given `projection`.         |
| **Set**                                    |                                                                                                             |
| `@SetContains(required, options?)`         | Checks if the given value is a Set and contains all required values.                                        |
| `@SetMaxSize(maximum, options?)`           | Checks if the given value is a Set with no more than `maximum` values.                                      |
| `@SetMinSize(minimum, options?)`           | Checks if the given value is a Set with no fewer than `minimum` values.                                     |
| `@SetNotContains(forbidden, options?)`     | Checks if the given value is a Set which does not contain any of the `forbidden` values.                    |
| `@SetNotEmpty(options?)`                   | Checks if the given value is a Set with at least one value.                                                 |
| `@SetUnique(projection, options?)`         | Checks if the given value is a Set without duplicate values with regard to the given `projection`.          |
| **String**                                 |                                                                                                             |
| `@IsAwsRegion(options?)`                   | Checks if the given value is an AWS region string.                                                          |
| `@IsTimezone(options?)`                    | Checks if the given value is a valid timezone string.                                                       |
