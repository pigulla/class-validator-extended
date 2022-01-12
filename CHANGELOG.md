# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   `IsAwsARN`: Added new validator.
-   `IsAwsRegion`: Added new validator.
-   `IsDuration`: Added new validator.

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
