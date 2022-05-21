# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   `ArraySize`: Added new validator.
-   `MapSize`: Added new validator.
-   `SetSize`: Added new validator.

## [1.0.0] - 2022-04-03

### Chore

-   Update dependencies and release first stable version.

## [0.0.6] - 2022-01-25

### Changed

-   `IsDuration`: The duration object is required to be valid by default.

### Added

-   `IsDuration`: Added `allow_invalid` option.
-   `IsNetworkPort`: Added new validator.
-   `MaxDuration`: Added new validator.
-   `MinDuration`: Added new validator.
-   `Nullable`: Added new validator.
-   `Optional`: Added new validator.

## [0.0.5] - 2022-01-14

### Changed

-   `IsDayjs`: Replaced `is_valid` option with `allow_invalid`.
-   `dayjs` is now an `optionalDependency` instead of a `peerDependency`
-   Most decorator options are now inlined and thus simpler to use and more readable in the generated documentation.

### Added

-   `ArrayMonotonic`: Make the comparator/projection optional.
-   `FutureDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
-   `PastDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
-   `MaxDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
-   `MinDayjs` Added `allow_invalid`, `granularity` and `inclusive` options.
-   You can now import `dist/minimal` if you installed the package without optional dependencies.

## [0.0.4] - 2022-01-12

### Added

-   `IsAwsARN`: Added new validator.
-   `IsAwsRegion`: Added new validator.
-   `IsDuration`: Added new validator.

## [0.0.3] - 2022-01-12

_This release was unpublished due to a broken release bundle._

## [0.0.2-beta] - 2022-01-10

### Changed

-   `IsMonotonic`: Renamed to `ArrayMonotonic` to be consistent with the upstream nomenclature.

### Added

-   `ArrayMonotonic`: Added an option to use a comparator instead of a projection function.
-   `FutureDate`: Added new validator.
-   `FutureDayjs`: Added new validator.
-   `IsBigInt`: Added new validator.
-   `IsMap`: Added new validator.
-   `IsSet`: Added new validator.
-   `IsTimezone`: Added new validator.
-   `MapContainsKeys`: Added new validator.
-   `MapContains`: Added new validator.
-   `MapMaxSize`: Added new validator.
-   `MapMinSize`: Added new validator.
-   `MapNotContainsKeys`: Added new validator.
-   `MapNotContains`: Added new validator.
-   `MapUniqueKeys`: Added new validator.
-   `MapUnique`: Added new validator.
-   `MaxBigInt`: Added new validator.
-   `MaxDayjs`: Added new validator.
-   `MinBigInt`: Added new validator.
-   `MinDayjs`: Added new validator.
-   `NegativeBigInt`: Added new validator.
-   `PastDate`: Added new validator.
-   `PastDayjs`: Added new validator.
-   `PositiveBigInt`: Added new validator.
-   `SetContains`: Added new validator.
-   `SetMaxSize`: Added new validator.
-   `SetMinSize`: Added new validator.
-   `SetNotContains`: Added new validator.
-   `SetUnique`: Added new validator.

## [0.0.1-beta] - 2021-05-23

### Added

-   Initial [release on npm](https://www.npmjs.com/package/class-validator-extended).
