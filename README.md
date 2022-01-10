![npm](https://img.shields.io/npm/v/class-validator-extended?style=flat-square&cacheSeconds=3600)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/pigulla/class-validator-extended/Node.js%20CI?style=flat-square&cacheSeconds=3600)
![requires.io](https://img.shields.io/requires/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)
![Codecov](https://img.shields.io/codecov/c/github/pigulla/class-validator-extended?style=flat-square&cacheSeconds=3600)
![npm bundle size](https://img.shields.io/bundlephobia/min/class-validator-extended?style=flat-square&cacheSeconds=3600)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/class-validator-extended?style=flat-square&cacheSeconds=3600)

# class-validator-extended

> Additional decorator and non-decorator based validation for class-validator.

## Validation decorators

| Decorator                       | Description                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `@ArrayMonotonic(options)`      | Checks if given array is sorted according to the given options.                   |
| `@IsDayjs(options)`             | Checks if given value is a [Dayjs](https://www.npmjs.com/package/dayjs) instance. |
| `@IsMap()`                      | Checks if given value is a Map instance.                                          |
| `@IsSet()`                      | Checks if given value is a Set instance.                                          |
| `@MapContains(values[])`        | Checks if given map contains all values from the array of values.                 |
| `@MapContainsKeys(values[])`    | Checks if given map contains all keys from the array of values.                   |
| `@MapNotContains(values[])`     | Checks if given map contains none of the values from the array of values.         |
| `@MapNotContainsKeys(values[])` | Checks if given map contains none of the keys from the array of values.           |
| `@MapNotEmpty()`                | Checks if given map is not empty.                                                 |
| `@SetContains(values[])`        | Checks if given set contains all values from the array of values.                 |
| `@SetNotContains(values[])`     | Checks if given set contains none of the values from the array of values.         |
| `@SetNotEmpty()`                | Checks if given set is empty.                                                     |

## Decorator Details

### ArrayMonotonic

### IsDayjs

### MapNotEmpty

### SetContains

### SetNotEmpty
