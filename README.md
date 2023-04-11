![Typescript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://www.npmjs.com/package/class-validator-extended)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/pigulla/class-validator-extended/build-and-test.yml?style=flat-square)
[![GitHub Issues](https://img.shields.io/github/issues-raw/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://github.com/pigulla/class-validator-extended/issues)
[![libraries.io](https://img.shields.io/librariesio/release/npm/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://libraries.io/npm/class-validator-extended)
[![Codecov](https://img.shields.io/codecov/c/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://app.codecov.io/gh/pigulla/class-validator-extended)
[![npm bundle size](https://img.shields.io/bundlephobia/min/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://bundlephobia.com/package/class-validator-extended)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/class-validator-extended?style=flat-square&cacheSeconds=3600)](https://snyk.io/advisor/npm-package/class-validator-extended)

# class-validator-extended

> Additional validators for [class-validator](https://github.com/typestack/class-validator).

#### Safe and simple to use

-   🕵️‍♀️ [Thoroughly tested](https://app.codecov.io/gh/pigulla/class-validator-extended)
-   📝 [Well documented](https://pigulla.github.io/class-validator-extended/index.html)
-   ✨ No additional dependencies ([Day.js](https://day.js.org/) is supported but optional)
-   😊 Uses [Semantic Versioning](https://semver.org/) and keeps a [nice](https://keepachangelog.com/en/1.0.0/) [Changelog](https://github.com/pigulla/class-validator-extended/blob/main/CHANGELOG.md)

## Installation

Use your favorite package manager to install:

```bash
npm install class-validator-extended
```

For obvious reasons, [class-validator](https://github.com/typestack/class-validator) needs to be installed.

## Usage

Just use the decorators like any of the built-in ones:

```typescript
import { ArrayMinSize } from 'class-validator'
import { ArrayMonotonic } from 'class-validator-extended'

class Foo {
    @ArrayMinSize(2)
    @ArrayMonotonic()
    values: [1, 13, 42]
}
```

If you don't have [Dayjs](https://day.js.org/) installed you need to use the `minimal` export:

```typescript
import { MaxBigInt } from 'class-validator-extended/dist/minimal'
```

Please note that Dayjs is an [optional dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#optionaldependencies) and will by default be installed by npm and yarn. To avoid this use `npm install --omit optional` or `yarn install --ignore-optional`, respectively.

## Validation decorators

For detailed information please read the [API docs](https://pigulla.github.io/class-validator-extended/modules.html).

| Decorator                                    | Description                                                                                                 |                                            API                                             |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------: |
| **Type**                                     |                                                                                                             |                                                                                            |
| `@IsBigInt(options?)`                        | Checks if the given value is a BigInt.                                                                      |      [🔗](https://pigulla.github.io/class-validator-extended/functions/IsBigInt.html)      |
| `@IsDayjs(options?)`                         | Checks if the given value is a valid Dayjs object.                                                          |      [🔗](https://pigulla.github.io/class-validator-extended/functions/IsDayjs.html)       |
| `@IsDuration(options?)`                      | Checks if the given value is a valid Dayjs Duration.                                                        |     [🔗](https://pigulla.github.io/class-validator-extended/functions/IsDuration.html)     |
| `@IsNull(options?)`                          | Checks if the given value is null.                                                                          |       [🔗](https://pigulla.github.io/class-validator-extended/functions/IsNull.html)       |
| `@IsMap(options?)`                           | Checks if the given value is a Map.                                                                         |       [🔗](https://pigulla.github.io/class-validator-extended/functions/IsMap.html)        |
| `@IsSet(options?)`                           | Checks if the given value is a Set.                                                                         |       [🔗](https://pigulla.github.io/class-validator-extended/functions/IsSet.html)        |
| **Common**                                   |                                                                                                             |                                                                                            |
| `@Nullable(options?)`                        | Only validates the given value if it is not `null`.                                                         |      [🔗](https://pigulla.github.io/class-validator-extended/functions/Nullable.html)      |
| `@Optional(options?)`                        | Only validates the given value if it is not `undefined`.                                                    |      [🔗](https://pigulla.github.io/class-validator-extended/functions/Optional.html)      |
| **Array**                                    |                                                                                                             |                                                                                            |
| `@ArrayMonotonic(options?)`                  | Checks if the given value is an array sorted in either (strictly) ascending or (strictly) descending order. |   [🔗](https://pigulla.github.io/class-validator-extended/functions/ArrayMonotonic.html)   |
| `@ArraySize(size, options?)`                 | Checks if the given value is an array with exatly `size` elements.                                          |     [🔗](https://pigulla.github.io/class-validator-extended/functions/ArraySize.html)      |
| **BigInt**                                   |                                                                                                             |                                                                                            |
| `@MaxBigInt(maximum, options?)`              | Checks if the given value is a BigInt not greater than `maximum`.                                           |     [🔗](https://pigulla.github.io/class-validator-extended/functions/MaxBigInt.html)      |
| `@MinBigInt(minimum, options?)`              | Checks if the given value is a BigInt not less than `minimum`.                                              |     [🔗](https://pigulla.github.io/class-validator-extended/functions/MinBigInt.html)      |
| `@NegativeBigInt(options?)`                  | Checks if the given value is a BigInt less than zero.                                                       |   [🔗](https://pigulla.github.io/class-validator-extended/functions/NegativeBigInt.html)   |
| `@PositiveBigInt(options?)`                  | Checks if the given value is a BigInt greater than zero.                                                    |   [🔗](https://pigulla.github.io/class-validator-extended/functions/PositiveBigInt.html)   |
| **Date**                                     |                                                                                                             |                                                                                            |
| `@FutureDate(options?)`                      | Checks if the given value is a Date object in the future.                                                   |     [🔗](https://pigulla.github.io/class-validator-extended/functions/FutureDate.html)     |
| `@PastDate(options?)`                        | Checks if the given value is a Date object in the past.                                                     |      [🔗](https://pigulla.github.io/class-validator-extended/functions/PastDate.html)      |
| **Dayjs**                                    |                                                                                                             |                                                                                            |
| `@FutureDayjs(options?)`                     | Checks if the given value is a valid Dayjs object in the future.                                            |    [🔗](https://pigulla.github.io/class-validator-extended/functions/FutureDayjs.html)     |
| `@MaxDayjs(maximum, options?)`               | Checks if the given value is a valid Dayjs object not later than `maximum`.                                 |      [🔗](https://pigulla.github.io/class-validator-extended/functions/MaxDayjs.html)      |
| `@MaxDuration(minimum, options?)`            | Checks if the given value is a valid Dayjs duration not longer than `maximum`.                              |    [🔗](https://pigulla.github.io/class-validator-extended/functions/MaxDuration.html)     |
| `@MinDayjs(minimum, options?)`               | Checks if the given value is a valid Dayjs object not earlier than `minimum`.                               |      [🔗](https://pigulla.github.io/class-validator-extended/functions/MinDayjs.html)      |
| `@MinDuration(minimum, options?)`            | Checks if the given value is a valid Dayjs duration not shorter than `minimum`.                             |    [🔗](https://pigulla.github.io/class-validator-extended/functions/MinDuration.html)     |
| `@PastDayjs(options?)`                       | Checks if the given value is a valid Dayjs object in the past.                                              |     [🔗](https://pigulla.github.io/class-validator-extended/functions/PastDayjs.html)      |
| **Map**                                      |                                                                                                             |                                                                                            |
| `@MapContains(required, options?)`           | Checks if the given value is a Map and contains all `required` values.                                      |    [🔗](https://pigulla.github.io/class-validator-extended/functions/MapContains.html)     |
| `@MapContainsKeys(required, options?)`       | Checks if the given value is a Map and contains all `required` keys.                                        |  [🔗](https://pigulla.github.io/class-validator-extended/functions/MapContainsKeys.html)   |
| `@MapMaxSize(maximum, options?)`             | Checks if the given value is a Map with no more than `maximum` entries.                                     |     [🔗](https://pigulla.github.io/class-validator-extended/functions/MapMaxSize.html)     |
| `@MapMinSize(minimum, options?)`             | Checks if the given value is a Map with no fewer than `minimum` entries.                                    |     [🔗](https://pigulla.github.io/class-validator-extended/functions/MapMinSize.html)     |
| `@MapNotContains(forbidden, options?)`       | Checks if the given value is a Map which does not contain any of the `forbidden` values.                    |   [🔗](https://pigulla.github.io/class-validator-extended/functions/MapNotContains.html)   |
| `@MapNotContainsKeys(forbidden, options?)`   | Checks if the given value is a Map which does not contain any of the `forbidden` keys.                      | [🔗](https://pigulla.github.io/class-validator-extended/functions/MapNotContainsKeys.html) |
| `@MapNotEmpty(options?)`                     | Checks if the given value is a Map with at least one entry.                                                 |    [🔗](https://pigulla.github.io/class-validator-extended/functions/MapNotEmpty.html)     |
| `@MapSize(size, options?)`                   | Checks if the given value is a Map with exactly `size` entries.                                             |      [🔗](https://pigulla.github.io/class-validator-extended/functions/MapSize.html)       |
| `@MapUnique(projection, options?)`           | Checks if the given value is a Map without duplicates with regard to the given `projection`.                |     [🔗](https://pigulla.github.io/class-validator-extended/functions/MapUnique.html)      |
| `@MapUniqueKeys(projection, options?)`       | Checks if the given value is a Map whose keys are all unique with regard to the given `projection`.         |   [🔗](https://pigulla.github.io/class-validator-extended/functions/MapUniqueKeys.html)    |
| **Number**                                   |                                                                                                             |                                                                                            |
| `@IsNetworkPort(options?)`                   | Checks if the given value is a valid port number.                                                           |   [🔗](https://pigulla.github.io/class-validator-extended/functions/IsNetworkPort.html)    |
| **Set**                                      |                                                                                                             |                                                                                            |
| `@SetContains(required, options?)`           | Checks if the given value is a Set and contains all required values.                                        |    [🔗](https://pigulla.github.io/class-validator-extended/functions/SetContains.html)     |
| `@SetMaxSize(maximum, options?)`             | Checks if the given value is a Set with no more than `maximum` values.                                      |     [🔗](https://pigulla.github.io/class-validator-extended/functions/SetMaxSize.html)     |
| `@SetMinSize(minimum, options?)`             | Checks if the given value is a Set with no fewer than `minimum` values.                                     |     [🔗](https://pigulla.github.io/class-validator-extended/functions/SetMinSize.html)     |
| `@SetNotContains(forbidden, options?)`       | Checks if the given value is a Set which does not contain any of the `forbidden` values.                    |   [🔗](https://pigulla.github.io/class-validator-extended/functions/SetNotContains.html)   |
| `@SetSize(size, options?)`                   | Checks if the given value is a Set with exactly `size` entries.                                             |      [🔗](https://pigulla.github.io/class-validator-extended/functions/SetSize.html)       |
| `@SetNotEmpty(options?)`                     | Checks if the given value is a Set with at least one value.                                                 |    [🔗](https://pigulla.github.io/class-validator-extended/functions/SetNotEmpty.html)     |
| `@SetUnique(projection, options?)`           | Checks if the given value is a Set without duplicate values with regard to the given `projection`.          |     [🔗](https://pigulla.github.io/class-validator-extended/functions/SetUnique.html)      |
| **String**                                   |                                                                                                             |                                                                                            |
| `@IsAwsRegion(options?)`                     | Checks if the given value is an AWS region string.                                                          |    [🔗](https://pigulla.github.io/class-validator-extended/functions/IsAwsRegion.html)     |
| `@IsAwsARN(options?)`                        | Checks if the given value is an AWS ARN string.                                                             |      [🔗](https://pigulla.github.io/class-validator-extended/functions/IsAwsARN.html)      |
| `@NotMatches(pattern, modifiers?, options?)` | Checks if the given value is an string that does not match the given regular expression.                    |     [🔗](https://pigulla.github.io/class-validator-extended/functions/NotMatches.html)     |
