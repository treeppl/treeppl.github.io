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

- New flag ```--data-augmentation``` (see ```tpplc --help``` for details)
- Added math functions, distribution types and functions, and tree types and functions to the library. The code is in separate library files (`math.tppl`, `distributions.tppl` and `trees.tppl`) in the `src/lib/` directory.
- Added diversification model example for the birth-death diffusion (BDD) model, version 2 (analogous to ClaDS2).
- Added diversification model versions with hard-coded delayed sampling.
- Added constant-rate birth-death (CRBD) model using weights based on analytical likelihood rather than simulation.
- Python interface: Introduced `CompileArguments` and `RunArguments` classes for handling compile and run arguments. `RunArguments` can now be serialized to and deserialized from JSON files for easier reuse and reproducibility.

### Changed

- Moved the functions `exp`, `log`, `sqrt`, `minInt`, `maxInt`, `floor`, `ceil`, `round` from the `standard.tppl` library file to `math.tppl`.
- Python interface: Compile arguments now mirrors the arguments used by `tpplc` for improved consistency and alignment between interfaces.

### Deprecated

### Removed

- Removed the `Tree` type from the `standard.tppl` library file. An identical type, called `ClockTree`, is now in the `trees.tppl` library file. This change allows a more convenient interface, in that a user can synonymize a local custom `Tree` type with `ClockTree`, or any other tree type in the standard library that is appropriate for the model script.
- Jupyter interface: Removed legacy syntax highlighting support that was only compatible with older Jupyter Notebook versions.

### Fixed

- Changed the `rho` parameter (leaf sampling probability) in the data files for the diversification model scripts from `2.0` to `0.5`.

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

