---
id: changelog
sidebar_position: 12
---

# Changelog

All notable changes to this project (since 2026-02-19) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added math functions, distribution types and functions, and tree types and functions to the library. The code is in separate library files (`math.tppl`, `distributions.tppl` and `trees.tppl`).
- Added diversification model example for the birth-death diffusion (BDD) model, version 2 (analogous to ClaDS2).
- Added diversification model versions with hard-coded delayed sampling.
- Added constant-rate birth-death (CRBD) model using weights based on analytical likelihood rather than simulation.

### Changed

### Deprecated

### Removed

### Fixed

### Security

## v0.3

### Added

- New flag ```--infer-time``` (see ```tpplc --help``` for details)
- Add a changelog to the webside

### Changed

- The `debug` statement now accepts multiple arguments

### Deprecated

### Removed

### Fixed

- Using `debug` to print strings no longer crashes

### Security

## v0.3

### Added

- New flag ```--infer-time``` (see ```tpplc --help``` for details)
- Add a changelog to the webside

### Changed

- The `debug` statement now accepts multiple arguments

### Deprecated

### Removed

### Fixed

- Using `debug` to print strings no longer crashes

### Security

