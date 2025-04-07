# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.1.0] - 2025-04-07

### Changed

- Fixed multiple bugs that caused decorator options not being passed through to the underlying predicate function.

### Chore

- Update dependencies.

## [4.0.3] - 2025-01-06

### Chore

- Update dependencies to fix a potential security issue.

## [4.0.2] - 2025-01-06

### Chore

- Update dependencies to fix a potential security issue.

## [4.0.1] - 2024-09-15

### Chore

- Update dependencies to fix a potential security issue.

## [4.0.0] - 2024-02-19

### Changed

- `class-validator` must be at least at version 0.14.1

## [3.2.0] - 2023-11-30

### Changed

- All dependencies are now pinned.
- Don't fail build when uploading the coverage to Codecov fails.
- Added linting for `package.json` and `package-lock.json`.

## [3.1.2] - 2023-08-15

### Chore

- Update dependencies to fix a potential security issue.
- Fix various typos.

## [3.1.1] - 2023-07-18

### Fixed

- `IsNetworkPort`: Fixed issue where some valid values were rejected.

## [3.1.0] - 2023-04-11

### Added

- `NotMatches`: Added new validator.

## [3.0.0] - 2023-03-28

### Removed

- `IsTimezone`: Removed because this was added to `class-validator` in [0.14.0](https://github.com/typestack/class-validator/blob/develop/CHANGELOG.md#0140-2022-12-09).

### Added

- `IsNull`: Added new validator.

### Changed

- `IsSet`, `IsMap`, `IsBigInt`, `IsDayjs`, `IsDuration`: Moved from `set`, `map`, `bigint` and `dayjs` to `type` directory, respectively. This is a non-breaking change for clients using the default exports.

## [2.0.0] - 2023-03-06

### Changed

- `IsDuration`: Allow negative durations. Use `MinDuration` to check for negative values.

## [1.1.1] - 2023-01-22

### Chore

- Update dependencies to fix a potential security issue.

## [1.1.0] - 2022-05-21

### Added

- `ArraySize`: Added new validator.
- `MapSize`: Added new validator.
- `SetSize`: Added new validator.

## [1.0.0] - 2022-04-03

### Chore

- Update dependencies and release first stable version.

## [0.0.6] - 2022-01-25

### Changed

- `IsDuration`: The duration object is required to be valid by default.

### Added

- `IsDuration`: Added `allow_invalid` option.
- `IsNetworkPort`: Added new validator.
- `MaxDuration`: Added new validator.
- `MinDuration`: Added new validator.
- `Nullable`: Added new validator.
- `Optional`: Added new validator.

## [0.0.5] - 2022-01-14

### Changed

- `IsDayjs`: Replaced `is_valid` option with `allow_invalid`.
- `dayjs` is now an `optionalDependency` instead of a `peerDependency`
- Most decorator options are now inlined and thus simpler to use and more readable in the generated documentation.

### Added

- `ArrayMonotonic`: Make the comparator/projection optional.
- `FutureDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
- `PastDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
- `MaxDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
- `MinDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
- You can now import `dist/minimal` if you installed the package without optional dependencies.

## [0.0.4] - 2022-01-12

### Added

- `IsAwsARN`: Added new validator.
- `IsAwsRegion`: Added new validator.
- `IsDuration`: Added new validator.

## [0.0.3] - 2022-01-12

_This release was unpublished due to a broken release bundle._

## [0.0.2-beta] - 2022-01-10

### Changed

- `IsMonotonic`: Renamed to `ArrayMonotonic` to be consistent with the upstream nomenclature.

### Added

- `ArrayMonotonic`: Added an option to use a comparator instead of a projection function.
- `FutureDate`: Added new validator.
- `FutureDayjs`: Added new validator.
- `IsBigInt`: Added new validator.
- `IsMap`: Added new validator.
- `IsSet`: Added new validator.
- `IsTimezone`: Added new validator.
- `MapContainsKeys`: Added new validator.
- `MapContains`: Added new validator.
- `MapMaxSize`: Added new validator.
- `MapMinSize`: Added new validator.
- `MapNotContainsKeys`: Added new validator.
- `MapNotContains`: Added new validator.
- `MapUniqueKeys`: Added new validator.
- `MapUnique`: Added new validator.
- `MaxBigInt`: Added new validator.
- `MaxDayjs`: Added new validator.
- `MinBigInt`: Added new validator.
- `MinDayjs`: Added new validator.
- `NegativeBigInt`: Added new validator.
- `PastDate`: Added new validator.
- `PastDayjs`: Added new validator.
- `PositiveBigInt`: Added new validator.
- `SetContains`: Added new validator.
- `SetMaxSize`: Added new validator.
- `SetMinSize`: Added new validator.
- `SetNotContains`: Added new validator.
- `SetUnique`: Added new validator.

## [0.0.1-beta] - 2021-05-23

### Added

- Initial [release on npm](https://www.npmjs.com/package/class-validator-extended).
