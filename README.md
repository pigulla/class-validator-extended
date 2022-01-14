[![npm](https://img.shields.io/npm/v/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://www.npmjs.com/package/class-validator-extended)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/pigulla/class-validator-extended/Node.js%20CI?style=flat-square&cacheSeconds=3600)](https://github.com/pigulla/class-validator-extended/actions?query=branch%3Amain)
[![GitHub Issues](https://img.shields.io/github/issues-raw/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://github.com/pigulla/class-validator-extended/issues)
[![requires.io](https://img.shields.io/requires/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://requires.io/github/pigulla/class-validator-extended/requirements/?branch=main)
[![Codecov](https://img.shields.io/codecov/c/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://app.codecov.io/gh/pigulla/class-validator-extended)
[![npm bundle size](https://img.shields.io/bundlephobia/min/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://bundlephobia.com/package/class-validator-extended)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://snyk.io/advisor/npm-package/class-validator-extended)

# class-validator-extended

> Additional decorator and non-decorator based validation for [class-validator](https://github.com/typestack/class-validator).

#### Safe and simple to use

-   🕵️‍♀️ Thoroughly tested
-   🕮 Well documented
-   ✨ No additional dependencies ([Day.js](https://day.js.org/) is supported but optional)
-   😊 Uses [Semantic Versioning](https://semver.org/) and keeps a [nice](https://keepachangelog.com/en/1.0.0/) [Changelog](https://github.com/pigulla/class-validator-extended/blob/main/CHANGELOG.md)

## Validation decorators

For detailed information please read the [API docs](https://pigulla.github.io/class-validator-extended/modules.html).

| Decorator                                  | Description                                                                                                 |                                           API                                            |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------: |
| **Type**                                   |                                                                                                             |                                                                                          |
| `@IsBigInt(options?)`                      | Checks if the given value is a BigInt.                                                                      |      [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsBigInt)      |
| `@IsDayjs(options?)`                       | Checks if the given value is a Dayjs object.                                                                |      [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsDayjs)       |
| `@IsDuration(options?)`                    | Checks if the given value is a Dayjs Duration object.                                                       |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsDuration)     |
| `@IsMap(options?)`                         | Checks if the given value is a Map.                                                                         |       [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsMap)        |
| `@IsSet(options?)`                         | Checks if the given value is a Set.                                                                         |       [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsSet)        |
| **Array**                                  |                                                                                                             |                                                                                          |
| `@ArrayMonotonic(options?)`                | Checks if the given value is an array sorted in either (strictly) ascending or (strictly) descending order. |   [🔗](https://pigulla.github.io/class-validator-extended/modules.html#ArrayMonotonic)   |
| **BigInt**                                 |                                                                                                             |                                                                                          |
| `@MaxBigInt(maximum, options?)`            | Checks if the given value is a BigInt not greater than `maximum`.                                           |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MaxBigInt)      |
| `@MinBigInt(minimum, options?)`            | Checks if the given value is a BigInt not less than `minimum`.                                              |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MinBigInt)      |
| `@NegativeBigInt(options?)`                | Checks if the given value is a BigInt less than zero.                                                       |   [🔗](https://pigulla.github.io/class-validator-extended/modules.html#NegativeBigInt)   |
| `@PositiveBigInt(options?)`                | Checks if the given value is a BigInt greater than zero.                                                    |   [🔗](https://pigulla.github.io/class-validator-extended/modules.html#PositiveBigInt)   |
| **Date**                                   |                                                                                                             |                                                                                          |
| `@FutureDate(options?)`                    | Checks if the given value is a Date object in the future.                                                   |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#FutureDate)     |
| `@PastDate(options?)`                      | Checks if the given value is a Date object in the past.                                                     |      [🔗](https://pigulla.github.io/class-validator-extended/modules.html#PastDate)      |
| **Dayjs**                                  |                                                                                                             |                                                                                          |
| `@FutureDayjs(options?)`                   | Checks if the given value is a Dayjs object in the future.                                                  |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#FutureDayjs)     |
| `@MaxDayjs(maximum. options?)`             | Checks if the given value is a Dayjs object not later than `maximum`.                                       |      [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MaxDayjs)      |
| `@MinDayjs(minimum, options?)`             | Checks if the given value is a Dayjs object not earlier than `minimum`.                                     |      [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MinDayjs)      |
| `@PastDayjs(options?)`                     | Checks if the given value is a Dayjs object in the past.                                                    |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#PastDayjs)      |
| **Map**                                    |                                                                                                             |                                                                                          |
| `@MapContains(required, options?)`         | Checks if the given value is a Map and contains all `required` values.                                      |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapContains)     |
| `@MapContainsKeys(required, options?)`     | Checks if the given value is a Map and contains all `required` keys.                                        |  [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapContainsKeys)   |
| `@MapMaxSize(maximum, options?)`           | Checks if the given value is a Map with no more than `maximum` entries.                                     |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapMaxSize)     |
| `@MapMinSize(minimum, options?)`           | Checks if the given value is a Map with no fewer than `minimum` entries.                                    |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapMinSize)     |
| `@MapNotContains(forbidden, options?)`     | Checks if the given value is a Map which does not contain any of the `forbidden` values.                    |   [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapNotContains)   |
| `@MapNotContainsKeys(forbidden, options?)` | Checks if the given value is a Map which does not contain any of the `forbidden` keys.                      | [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapNotContainsKeys) |
| `@MapNotEmpty(options?)`                   | Checks if the given value is a Map with at least one entry.                                                 |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapNotEmpty)     |
| `@MapUnique(projection, options?)`         | Checks if the given value is a Map without duplicates with regard to the given `projection`.                |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapUnique)      |
| `@MapUniqueKeys(projection, options?)`     | Checks if the given value is a Map whose keys are all unique with regard to the given `projection`.         |   [🔗](https://pigulla.github.io/class-validator-extended/modules.html#MapUniqueKeys)    |
| **Set**                                    |                                                                                                             |                                                                                          |
| `@SetContains(required, options?)`         | Checks if the given value is a Set and contains all required values.                                        |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#SetContains)     |
| `@SetMaxSize(maximum, options?)`           | Checks if the given value is a Set with no more than `maximum` values.                                      |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#SetMaxSize)     |
| `@SetMinSize(minimum, options?)`           | Checks if the given value is a Set with no fewer than `minimum` values.                                     |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#SetMinSize)     |
| `@SetNotContains(forbidden, options?)`     | Checks if the given value is a Set which does not contain any of the `forbidden` values.                    |   [🔗](https://pigulla.github.io/class-validator-extended/modules.html#SetNotContains)   |
| `@SetNotEmpty(options?)`                   | Checks if the given value is a Set with at least one value.                                                 |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#SetNotEmpty)     |
| `@SetUnique(projection, options?)`         | Checks if the given value is a Set without duplicate values with regard to the given `projection`.          |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#SetUnique)      |
| **String**                                 |                                                                                                             |                                                                                          |
| `@IsAwsRegion(options?)`                   | Checks if the given value is an AWS region string.                                                          |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsAwsRegion)     |
| `@IsAwsARN(options?)`                      | Checks if the given value is an AWS ARN string.                                                             |    [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsAwsRegion)     |
| `@IsTimezone(options?)`                    | Checks if the given value is a valid timezone string.                                                       |     [🔗](https://pigulla.github.io/class-validator-extended/modules.html#IsTimezone)     |
