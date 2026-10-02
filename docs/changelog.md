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

### Changed

### Deprecated

### Removed

### Fixed

### Security

## v0.5

### Added
- ([dppl#239](https://github.com/miking-lang/miking-dppl/pull/239), [treeppl#161](https://github.com/treeppl/treeppl/pull/161)) `--debug-graph-json <FILE>` to output a json representation of the graph generated when running a model compiled with `mcmc-graph`.
- ([dppl#243](https://github.com/miking-lang/miking-dppl/pull/243), [treeppl#161](https://github.com/treeppl/treeppl/pull/161)) `--debug-idealized <FILE>` to output a pretty-printed version of the graph after the idealized transformation stage.
- ([dppl#240](https://github.com/miking-lang/miking-dppl/pull/240), [dppl#242](https://github.com/miking-lang/miking-dppl/pull/242)) Improved the graph translation performed in `-m mcmc-graph`
- ([dppl#245](https://github.com/miking-lang/miking-dppl/pull/245), [treeppl#163](https://github.com/treeppl/treeppl/pull/163)) Add `--max-propagations INT` to limit `smc-apf` near infinite loop (see `tpplc --help` for more details)
- ([treeppl#165](https://github.com/treeppl/treeppl/pull/165)) A `tpplc --version` flag that prints a version number when given to a released compiler and `~git~` when given to a manually built compiler.
- ([treeppl#169](https://github.com/treeppl/treeppl/pull/169)) Add `all` function.
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) Add `tp_runtime_options`
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) `tp_run(n_runs)`  to run multiple sweeps/runs
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) `tp_run(n_processes)`  to run MCMC or SMC in parallel using n cores
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) `tp_compile_methods()`  to find available methods
- ([treepplr#14](https://github.com/treeppl/treepplr/pull/14)) Tim and Stenio as package authors in DESCRIPTION.

### Changed
- ([treeppl#172](https://github.com/treeppl/treeppl/pull/172)) Updated external dependencies
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) Change "compiled_model" to "sampler" (temporary)
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) Updated the documentation
- ([treepplr#14](https://github.com/treeppl/treepplr/pull/14)) treepplr package installation should be done with `pak::pak` because `devtools::install_github` will soon be deprecated.
- ([treepplr#30](https://github.com/treeppl/treepplr/pull/30)) Updated roxygen documentation for `tp_parse_smc()` and `tp_parse_mcmc()`. Changed their output objects to tidy data frames.
- ([miking#1006](https://github.com/miking-lang/miking/pull/1006), [dppl#246](https://github.com/miking-lang/miking-dppl/pull/246), [treeppl#165](https://github.com/treeppl/treeppl/pull/165)) Rearranged `tpplc --help` output for nicer readability

### Deprecated
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) all references to `n_runs` have been remove

### Removed

### Fixed
- ([treeppl#162](https://github.com/treeppl/treeppl/pull/162)) Matrix operations should no longer be compiled incorrectly when using `mcmc-graph`.
- ([treeppl#166](https://github.com/treeppl/treeppl/pull/166)) Lexing errors now point at the actual problem
- ([treeppl#172](https://github.com/treeppl/treeppl/pull/172)) Updated builds to work on MacOS 27
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) Always check if tpplc is installed before calling it
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) `tp_compile_options`  update for new `--help` format
- ([treepplr#30](https://github.com/treeppl/treepplr/pull/30)) `tp_parse_smc()` and `tp_parse_mcmc()` now parse per-particle/iteration with explicit indices and (for SMC) join weights by index using `left_join(..., by = "particle")` instead of relying on positional recycling, which is the default behavior of `data.frame()` when handling vectors of different lengths.

### Security

## v0.4.1

### Added

### Changed

### Deprecated

### Removed

### Fixed

- ([treeppl-python#23](https://github.com/treeppl/treeppl-python/pull/23)) Added missing import of `importlib.resources`, which would be implicitly imported on some machines, but not all.

### Security

## v0.4

### Added

- ([dppl#223](https://github.com/miking-lang/miking-dppl/pull/223), [treeppl#147](https://github.com/treeppl/treeppl/pull/147), [dppl#230](https://github.com/miking-lang/miking-dppl/pull/230), [treeppl#150](https://github.com/treeppl/treeppl/pull/150), [treeppl#151](https://github.com/treeppl/treeppl/pull/151)) New flag ```--data-augmentation``` (see ```tpplc --help``` for details)
- ([treeppl#138](https://github.com/treeppl/treeppl/pull/138)) Added some distribution functions for manual updates via conjugate priors
- ([treeppl#138](https://github.com/treeppl/treeppl/pull/138)) Added diversification model example for the birth-death diffusion (BDD) model, version 2 (analogous to ClaDS2).
- ([treeppl#138](https://github.com/treeppl/treeppl/pull/138)) Added diversification model versions with hard-coded delayed sampling.
- ([treeppl#138](https://github.com/treeppl/treeppl/pull/138)) Added constant-rate birth-death (CRBD) model using weights based on analytical likelihood rather than simulation.
- ([treeppl-python#18](https://github.com/treeppl/treeppl-python/pull/18)) Python interface: Introduced `CompileArguments` and `RunArguments` classes for handling compile and run arguments. `RunArguments` can now be serialized to and deserialized from JSON files for easier reuse and reproducibility.
- ([dppl#231](https://github.com/miking-lang/miking-dppl/pull/231)) Added previous weight and proposal weight to output of `--debug-mcmc`
- ([miking#986](https://github.com/miking-lang/miking/pull/986), [dppl#234](https://github.com/miking-lang/miking-dppl/pull/234), [dppl#236](https://github.com/miking-lang/miking-dppl/pull/236), [treeppl#155](https://github.com/treeppl/treeppl/pull/155)) Experimental new inference method `-m mcmc-graph`
- ([treeppl#149](https://github.com/treeppl/treeppl/pull/149)) Models included with the compiler can now be referenced in `import`s or as arguments to `tpplc` via, e.g., `treeppl::models/diversification/crbd.tppl`

### Changed

- ([dppl#229](https://github.com/miking-lang/miking-dppl/pull/229)) Inference methods using alignment now crash if no aligned `assume`s were found.
- ([dppl#238](https://github.com/miking-lang/miking-dppl/pull/238)) SMC-based inference methods now refuse to compile if no `observe` or `weight`s are found.
- ([treeppl-python#18](https://github.com/treeppl/treeppl-python/pull/18)) Python interface: Compile arguments now mirrors the arguments used by `tpplc` for improved consistency and alignment between interfaces.
- ([miking#984](https://github.com/miking-lang/miking/pull/984), [treeppl#135](https://github.com/treeppl/treeppl/pull/135)) Command line flags are now split into categories, and some parameters can be given to a compiled model
- ([treeppl#143](https://github.com/treeppl/treeppl/pull/143)) The `debug` statement now prints literal strings as-is, while variables are pretty-printed.
- ([miking#999](https://github.com/miking-lang/miking/pull/999)) Incompatible flags are reported as such, rather than unrecognized.

### Deprecated

### Removed

- ([treeppl#153](https://github.com/treeppl/treeppl/pull/153)) Removed the `Tree` type from the `standard.tppl` library file. An identical type, called `ClockTree`, is now in the `trees.tppl` library file. This change allows a more convenient interface, in that a user can synonymize a local custom `Tree` type with `ClockTree`, or any other tree type in the standard library that is appropriate for the model script.
- ([treeppl-python#18](https://github.com/treeppl/treeppl-python/pull/18)) Jupyter interface: Removed legacy syntax highlighting support that was only compatible with older Jupyter Notebook versions.

### Fixed

- ([treeppl#138](https://github.com/treeppl/treeppl/pull/138)) Changed the `rho` parameter (leaf sampling probability) in the data files for the diversification model scripts from `2.0` to `0.5`.
- ([dppl#228](https://github.com/miking-lang/miking-dppl/pull/228)) Running multiple sweeps with `-m mcmc` now resets state properly between the runs
- ([miking#981](https://github.com/miking-lang/miking/pull/981)) The `debug` statement now properly handles printing strings
- ([treeppl#157](https://github.com/treeppl/treeppl/pull/157)) Bug in the code generation for pigeons related flags.

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
