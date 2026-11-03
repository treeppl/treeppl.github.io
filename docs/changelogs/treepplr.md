---
id: treepplr
sidebar_position: 3
---

# treepplr

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## v0.5.0

### Added
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) Add `tp_runtime_options`
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) `tp_run(n_runs)`  to run multiple sweeps/runs
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) `tp_run(n_processes)`  to run MCMC or SMC in parallel using n cores
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) `tp_compile_methods()`  to find available methods
- ([treepplr#14](https://github.com/treeppl/treepplr/pull/14)) Tim and Stenio as package authors in DESCRIPTION.
- ([treepplr#31](https://github.com/treeppl/treepplr/pull/31)) At the end of a run, `tp_run()` now prints a summary with runtime information and output directories/files.
- ([treepplr#31](https://github.com/treeppl/treepplr/pull/31)) New argument `wide` in `tp_parse_smc()` and `tp_parse_mcmc()` to choose between wide (standard in other software) and long (good for plotting) format. Default = `TRUE`.

### Changed
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) Change "compiled_model" to "sampler" (temporary)
- ([treepplr#13](https://github.com/treeppl/treepplr/pull/13)) Updated the documentation
- ([treepplr#14](https://github.com/treeppl/treepplr/pull/14)) treepplr package installation should be done with `pak::pak` because `devtools::install_github` will soon be deprecated.
- ([treepplr#30](https://github.com/treeppl/treepplr/pull/30)) Updated roxygen documentation for `tp_parse_smc()` and `tp_parse_mcmc()`. Changed their output objects to tidy data frames.
- ([treepplr#31](https://github.com/treeppl/treepplr/pull/31)) `tp_run()` now returns a tidy data frame (in wide format by default) instead of a list. It automatically calls `tp_parse_smc()` or `tp_parse_mcmc()`, depending on the inference method and model passed to `tp_compile()`. For models without a parser yet (e.g., models that return trees), it returns the path to the output JSON file along with a message.
- ([treepplr#31](https://github.com/treeppl/treepplr/pull/31)) `tp_parse_smc()` and `tp_parse_mcmc()` now take a character vector with the path(s) to the JSON output file(s) instead of the list returned by `tp_run()`.
- ([treepplr#31](https://github.com/treeppl/treepplr/pull/31)) `tp_mcmc_convergence()` and `tp_smc_convergence()` now accept data frames in either long or wide format.

### Deprecated
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) all references to `n_runs` have been remove

### Removed

### Fixed
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) Always check if tpplc is installed before calling it
- ([treepplr#12](https://github.com/treeppl/treepplr/pull/12)) `tp_compile_options`  update for new `--help` format
- ([treepplr#30](https://github.com/treeppl/treepplr/pull/30)) `tp_parse_smc()` and `tp_parse_mcmc()` now parse per-particle/iteration with explicit indices and (for SMC) join weights by index using `left_join(..., by = "particle")` instead of relying on positional recycling, which is the default behavior of `data.frame()` when handling vectors of different lengths.

### Security